MVP1 (open & close a vault; withdrawals; deposits) 
UC1 Cash Stock open :
Actor(s): Branch employee handling cash in EBE 

Description: Store the Cash Unit Stock counted by the employee and change the stage to open of the Cash Stock to allow cash transaction. 
Preconditions: 
Cash stock must be initiate or close. 
A cash difference on the global amount isn’t allow. 

STEP  
ACTIONS  
1.KASH-ta02 receives via the API call cash-stock-management/OpenCashStock with the following parameters: 

CashStockId must be the ID of the CashStock of the branch. 
CashStockSessionTypeName must be “BRANCH”. 
Employee data of the employee handle the cash via EBE. 
EmployeeRobiId 
EmployeeLastName 
EmployeeFirstName 
List of Cash Unit Stock 
CashUnitStockQuantity 
CashUnitId 
Cash Stock Operation 
CashStockOperationTypeName must be “CASH_STOCK_OPEN”. 
CashStockOperationComment is optional. 
CashStockOperationAmount must be the total amount counted. 


2.[Exception flow E1: Input data validation fails] 

KASH-ta02 validates the parameters receives: 
CashStockId must exist.  
CashStockStatusName of the CashStockId provided must be “CLOSE”. 
CashUnitId provided must exist. 
Total amount of the list of Cash Unit Stock is corresponding with the CashStockOperationAmount. Example 2 notes of 50€ must have a CashStockOperationAmount = 100€. 
CashStockOperationAmount is the same as the amount registered in the Cash Stock. 
The list of Cash Unit Stock provided must contain the same Cash Unit registered in the last Cash Stock Session and the stage of the Cash Unit Stock. 
Employee data provided must match with the SAML. 
Branch (UnitRobiId) of the Cash Stock provided must match with the SAML.  
 
[Exception flow E2: Functional validation fails] 

3.KASH-ta02 validates that the CashStockSessionStatusName of last Cash Stock Session registered for the CashStockId isn’t “OPEN”. 

[Exceptional Flow: E3: Exist Cash Stock Session with CashStockSessionStatusName with “OPEN”] 

4.Create a Cash Stock Session with the following parameters: 

CashStockSessionTypeName must be “BRANCH”. 
Employee data of the employee handle the cash via EBE. 
EmployeeRobiId 
EmployeeLastName 
EmployeeFirstName 
CashStockSessionStatusName must be “OPEN” 
CashStockSessionOpenDatetime must be the current datetime. 

5.Update Cash Stock with the following parameters: 

Update the CashStockStatusName from “CLOSE” to ”OPEN” 
Update the CashStockLastSessionId with the value of the step 4. 

6.Create Cash Unit Stock in stage "OPENED" with list of Cash Unit Stock received. 

7.Create a copy of Cash Unit Stock  in stage "OPENED" of step 6 with a stage "WORKING". 

8.Update Cash Stock Session with the following parameter : CashStockSessionLastStageName to “WORKING”. 
9.Update CashStockAmount of Cash Stock to amount received in CashStockOperationAmount  

10.Create a Cash Stock Operation with the following parameters: 

CashStockSessionID with the value of the step 4. 
CashStockID with the value receives in step 1. 
CashStockOperationTypeName with the value receives in step 1. 
CashStockOperationComment with the value receives in step 1. 
CashStockOperationStatusName must be “EXECUTED”. 
CashStockOperationAmount with the value receives in step 1. 
CashStockOperationCurrency must be “EUR” 
CashStockOperationCreationDatetime must be current datetime. 
EmployeeRobigId with the value receives in step 1. 
EmployeeLastName with the value receives in step 1. 
EmployeeFirstName with the value receives in step 1. 

11.KASH-ta02 returns the response with the following information: 

CashStockId 
CashStockSessionId 
CashStockOperationId 
CashStockOperationStatusName 


[Exception flow E4: Consumer doesn't receive response Cash Stock Open/Close] 

Notes: 

each step must be logged on Xalos. 

How to avoid data inconsistency in case of a technical issue? 

How to avoid issue if several open request for a Cash Stock at the same moment? 

Postcondition(s):  

A Cash Stock Session is created with the data of the employee and a status “OPËN” 

One or several Cash Unit Stock of the opening is registered and copied to new Cash Unit Stock with the status “WORKING”.  

Cash Stock is updated with the status “OPEN” which will allow cash transactions (withdrawal, deposit, retrun of cash, order of cash, …). 
