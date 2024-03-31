# Stage 5: Implementing Source Control and CI/CD with GitHub Actions

Within this segment, we'll integrate our website code into a GitHub repository and configure GitHub Actions to automate the task of pushing changes to our S3 bucket whenever we commit modifications to our website code. This CI/CD pipeline will seamlessly update our S3 bucket, promptly reflecting the alterations on our website, thereby guaranteeing a smooth and efficient development workflow.

### Step 1: Create a GitHub Repository for Your Website Code

Navigate to GitHub and create a repository where you can store your website code, enabling version control.


![Screenshot (2219)](https://github.com/cupumelody/cloud-resume/assets/145847069/c96bf6be-7c00-4655-8b8b-1371ab27a8e1)
<br>
<br>
<br>
### Step 2: Push Local Website Files to the GitHub Repository

To send your local website files to the GitHub repository, follow these steps (GitHub will also provide these steps as soon as your create the repository):

1. Initialize a Git repository in your local project folder (where you’re website files are stored) using the command `git init`.
2. Add all the files in your project folder to the Git repository using the command `git add .` (Don’t forget the period at the end).
3. Commit the changes with a descriptive message using the command `git commit -m "Initial commit"`.
4. Set the remote repository URL by running the command `git remote add origin <repository_url>`, where `<repository_url>` is the URL of your GitHub repository.
5. Push the local files to the remote repository with the command `git push origin master`.

Once completed, your local website files will be sent to the GitHub repository.
<br>
<br>
<br>
### Step 3: Setup CI/CD with GitHub Actions 

We want to create a seamless experience for updating our website code, ensuring that changes made on our local machine are reflected on our live website. By pushing these changes to GitHub, the CI/CD process will automatically upload the files to S3 and apply the updates, resulting in a dynamically changed website.

Navigate back to your website code and create a new folder named “.github/workflows” within the root folder of your website. Inside this folder, create a YAML file named “cicd.yml” to hold the GitHub Action configuration. Add the following code snippet to the “cicd.yml” file:

`name: Upload website to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: jakejarvis/s3-sync-action@master
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-east-1'#make sure the Region reflects yours
          SOURCE_DIR: 'website' #make sure the SOURCE_DIR is the correct name`

![1_mOYw6VP1_mLicxoLJ0MPjA](https://github.com/cupumelody/cloud-resume/assets/145847069/4fc5f46a-24d9-4ec7-8c1d-26b09c18a91e)

This GitHub Actions workflow is triggered whenever there is a push event on the “main” branch of the repository. It utilizes the “actions/checkout” action to fetch the latest code from the repository. The “jakejarvis/s3-sync-action” action is used to synchronize the files from the “website” directory to the S3 bucket.

The necessary environment variables, including AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and SOURCE_DIR, are supplied using GitHub Secrets.
<br>
<br>
<br>
### Step 5: Add Environment Variables for GitHub Actions

To ensure the successful execution of the actions, we need to define the required environment variables, including our S3 bucket name, access key ID, and secret access key.

1. Navigate to your GitHub repository settings.
2. On the left sidebar, click on “Secrets” or “Secrets and variables”.
3. Click on “New repository secret”.
4. Provide a name for the secret, such as “AWS_S3_BUCKET”.
5. Enter the corresponding value for the secret, such as the name of your S3 bucket.
6. Repeat steps 4 and 5 for the other required environment variables.
7. Save the secrets.

By adding these environment variables, the GitHub Actions workflow will have access to the necessary credentials and configurations to perform the required actions.

![Screenshot (2220)](https://github.com/cupumelody/cloud-resume/assets/145847069/f2c4ba32-07ef-4c07-883e-bf391c47e487)

To test the successful execution of GitHub Actions, you can create a test.txt file within your website directory, save the changes, and utilize the Source Control button in VSCode to commit the modifications and synchronize them.

![1_Ib_6rafU-JPbrvDeyf4u1A](https://github.com/cupumelody/cloud-resume/assets/145847069/5f0f323b-47de-4229-9494-b4a414aad8e5)

![1_UhxzAXMTRGuXvd1hY1eKwQ (1)](https://github.com/cupumelody/cloud-resume/assets/145847069/99f1fc42-e9a2-4ec2-b43d-6dafce2f2d10)

![1_b1OIBSFOX_udmZ5R6FXemw](https://github.com/cupumelody/cloud-resume/assets/145847069/7c2d32ba-32cb-4598-9336-7eed62605033)

Now that the changes have been synchronized, you can return to GitHub and verify that the action has completed successfully, resulting in the successful push of our changes to the S3 bucket!

![1_oghwS-3cQuMF2EPF4JdoNg](https://github.com/cupumelody/cloud-resume/assets/145847069/df6944b3-a117-4d59-87ee-cbbb1c121eaa)


![Screenshot (2222)](https://github.com/cupumelody/cloud-resume/assets/145847069/4f3d3513-906c-433b-8fcc-19ffb3fbb5d8)

