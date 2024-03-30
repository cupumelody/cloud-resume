# Stage 3: Implementing a View Counter with Lambda & DynamoDB

In the upcoming phase of this project, we aim to establish a view counter for our website utilizing Lambda API and DynamoDB as the database. This implementation will enable the website to showcase the total number of visitors it has received. Rather than directly interfacing with the database from our website, we will invoke a Lambda function to fetch the values from DynamoDB.

### STep 1: Set up DynamoDB

Navigate to the “Tables” section in DynamoDB to create a table for storing the view counter data, setting the primary key as “id” and leaving other settings as default, optionally adding a tag.

After creating the table, navigate to the “Explore items” section where there are currently no items, and proceed to create a new item with an attribute named “Views” having a value of “1” and the type set as “Number”.

You should now have a table created with an item specifically designed to store the view count.

![Screenshot (2211)](https://github.com/cupumelody/cloud-resume/assets/145847069/ade02897-8f63-4e10-bf07-219943b03fb9)
<br>
<br>
<br>
### Step 2:  Create a Lambda Function

We will now create a Lambda function that interacts with the DynamoDB table to increment the view counter, and configure the necessary permissions for the Lambda function to access DynamoDB.

Navigate to AWS Lambda and click on “Create function.” Provide a name for your function and choose the latest supported runtime, I used Python. Select the option to create a new execution role with basic Lambda permissions.

