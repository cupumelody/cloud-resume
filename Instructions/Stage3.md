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

```
create lambda function
```

In the advanced settings, we will also enable the Function URL to allow interaction with the function through HTTP requests. and set the Authorization type as “NONE” to allow unrestricted access. Additionally, we will enable CORS (Cross-Origin Resource Sharing) to whitelist our URL as the only allowed origin for fetching data from this API.

```
add
```
<br>
<br>
<br>
### Step 3: Adding Permissions to Lambda Function 

Now we need to add the necessary permissions for the Lambda function to retrieve and update the viewer count in DynamoDB. Navigate to the “Configuration” tab of your function, access the permission sidebar, and click on the execution role. This will redirect you to IAM, where you should add the “AmazonDynamoDBFullAccess” permission policy to the execution role, granting both Read and Write access.

![Screenshot (2212)](https://github.com/cupumelody/cloud-resume/assets/145847069/83e293ab-df85-4c5e-be8a-0a58ead88253)

While in the configuration menu, make sure to configure the CORS “Allow-Origin” setting to restrict access to the function URL only from your domain name.
<br>
<br>
<br>
### Step 4: Adding Code to the Lambda Function

After creating the function and granting the necessary permissions, you need to add the necessary code to fetch the item from the DynamoDB table. Deploy the provided code snippet below to achieve this:

```
import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('your-table-name')
def lambda_handler(event, context):
    response = table.get_item(Key={
        'id':'1'
    })
    views = response['Item']['views']
    views = views + 1
    print(views)
    response = table.put_item(Item={
        'id':'1',
        'views':views
    })
    
    return views
```

The provided code snippet utilizes the Boto3 library to interact with DynamoDB and accomplish the following actions:

1. Retrieves the current value of the ‘views’ attribute from the specified DynamoDB table (ensure to replace the table name with your own).
2. Increments the retrieved value by 1.
3. Prints the updated value of ‘views’.
4. Updates the ‘views’ attribute in the DynamoDB table with the new value.
5. Returns the updated ‘views’ count as the output of the Lambda function.

![Screenshot (2213)](https://github.com/cupumelody/cloud-resume/assets/145847069/c0a5b979-66db-4f66-8650-1c71cae51a77)

To test its functionality after deployment, you can execute the ‘curl’ command in your terminal, pointing it to the function URL, and then verify in the DynamoDB table if the value has indeed increased.
