pragma solidity ^0.4.18;

import "./ERC20Token.sol";
import "./SafeMath.sol";

contract LNFMatch {
  
   address ContractOwner;
   mapping(string => Item) Items; 
   

   constructor() public  {
        ContractOwner = msg.sender;
    }

  modifier onlyOwner() { require(msg.sender == ContractOwner); _; }

   struct Item {
        string AssetId; //IPFS Hash
        string QnAId; //IPFS Hash
        uint Type; //Found Or Lost
        address Owner; // Founder/Person Lost It
        uint Status; // 1: Wanted 2: Lost it 3: Claiming 4: Pending Shipping 5: Pending Payment 6: Complete
        address Witness;
        address Claimer;
        string ClaimerAnswer;
        uint Reward;
        uint Incentive;
        address ERCToken20Contract;
    }

    event ItemCreated(
       string AssetId,
       uint Type, 
       address Owner, 
       uint Status
    );

   event ItemModified(
       string AssetId,
       uint Status// 1: Wanted 2: Lost it 3: Claiming 4: Pending Shipping 5: Pending Payment 6: Complete
    );
    

   function createItem(
        string AssetId,
        string QnAId,
        uint Type
        // string ClaimerAnswer,
        // uint Reward,
        // uint Incentive,
        //address ERCToken20ContractAddress
        ) 
        external returns (bool success) 
        {
          Items[AssetId].AssetId = AssetId;
          Items[AssetId].QnAId =QnAId;
          Items[AssetId].Type =Type;
          Items[AssetId].Owner =msg.sender;
          Items[AssetId].Status = 1;
       
          emit ItemCreated(
                Items[AssetId].AssetId,
                Items[AssetId].Type, 
                Items[AssetId].Owner, 
                Items[AssetId].Status);

          return true;
        }

     function createItemReward(
        string AssetId,
        uint Reward,
        uint Incentive,
        address ERCToken20Contract
        ) 
        external returns (bool success) 
        {

          if(msg.sender !=Items[AssetId].Owner) revert();  

          Items[AssetId].AssetId = AssetId;
          Items[AssetId].Reward =Reward;
          Items[AssetId].Incentive =Incentive;
          Items[AssetId].ERCToken20Contract= ERCToken20Contract;
          emit ItemModified(
                Items[AssetId].AssetId,
                Items[AssetId].Status);
          return true;
        }


     
     function getItem(string AssetId) public constant returns  (
        string QnAId,
        uint Type,
        address Owner, 
        uint Status) 
     {
      return 
      (
       Items[AssetId].QnAId,
       Items[AssetId].Type,
       Items[AssetId].Owner, 
       Items[AssetId].Status
      );
  }

  function getItemClaimer(string AssetId) public constant returns  (
        address Claimer) 
     {
      return 
      (
      
       Items[AssetId].Claimer
      );
  }

  function getItemClaimerAnswer(string AssetId) public constant returns  (
        string ClaimerAnswer) 
     {
      return 
      (
      
       Items[AssetId].ClaimerAnswer
      );
  }

   function getItemWitness(string AssetId) public constant returns  (
        address Claimer) 
     {
      return 
      (
       Items[AssetId].Witness
      );
  }

 function getRewardInfo(string AssetId) public constant returns  (
        uint Reward,
        uint Incentive,
        address ERCToken20Contract) 
     {
      return 
      (
         Items[AssetId].Reward,
         Items[AssetId].Incentive,
         Items[AssetId].ERCToken20Contract
      );
  }


  function Claim(address token, string AssetId, string ClaimerAnswer) public returns (bool success)
  {
        if(msg.sender ==Items[AssetId].Owner) revert(); 
        if(Items[AssetId].Owner!=1) revert();   

        Items[AssetId].Claimer = msg.sender;
        Items[AssetId].ClaimerAnswer= ClaimerAnswer;
        Items[AssetId].Status = 2;
        withdrawToken(token,msg.sender,Items[AssetId].Reward);
        emit ItemModified(
                Items[AssetId].AssetId,
                Items[AssetId].Status);
        return true;
  }


  function Shipped(string AssetId) public returns (bool success)
  {
        if(msg.sender !=Items[AssetId].Owner &&  Items[AssetId].Status !=2 ) revert();
        Items[AssetId].Status = 3;
        emit ItemModified(
                Items[AssetId].AssetId,
                Items[AssetId].Status);
        return true;
  }

  function Redeem(address token, string AssetId) public returns (bool success)
  {
        if(msg.sender !=Items[AssetId].Witness &&  Items[AssetId].Status !=3 ) revert();
       
        Items[AssetId].Status = 4;

        transferToken(token,Items[AssetId].Owner,Items[AssetId].Reward);

        emit ItemModified(
                Items[AssetId].AssetId,
                Items[AssetId].Status);
        return true;
  }

    function transferToken(address token, address to, uint256 amount)private returns (bool success) 
    {
         ERC20Token m = ERC20Token(token);
         m.transfer(to,amount);
         return true;
    }

     function withdrawToken(address token, address from, uint256 amount)private returns (bool success) 
    {
         ERC20Token m = ERC20Token(token);
         m.transferFrom(from,address(this),amount);
         return true;
    }

    function refundToken(address token, address to, uint256 amount)private returns (bool success) 
    {
         ERC20Token m = ERC20Token(token);
         m.transferFrom(address(this),to,amount);
         return true;
    }

}