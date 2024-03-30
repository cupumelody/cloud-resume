# Stage 2: Hosting on the Cloud

In this section, we will explore how to set up Amazon S3 and CloudFront, two key services offered by Amazon Web Services (AWS), to host your HTML files and elevate your website to new heights.

### Step 1: Storing Your Website’s HTML Files with S3
To kickstart the process, we employ Amazon S3 (Simple Storage Service) as our storage solution for the HTML, CSS, and JavaScript files of our website. S3 boasts highly resilient and scalable object storage capabilities, rendering it an optimal selection for hosting static content. Through the creation of an S3 bucket, you can securely store and oversee your website’s files. Begin by establishing a new bucket and selecting a distinct Name and Region that aligns with your preferences.

![Screenshot (2203)](https://github.com/cupumelody/cloud-resume/assets/145847069/e992c262-86e5-4b28-af2c-68847255520a)

![ezgif-1-afb3defe01](https://github.com/cupumelody/cloud-resume/assets/145847069/20889763-a69d-4acc-b9c9-6a8688fec9ec)

Ensure that ACLs remain disabled, and be certain to enable the “Block all public access” setting to prevent any unauthorized public access to the contents stored in the bucket.
<br>
<br>
You can leave the Bucket Versioning, Encryption, and Object Lock settings at their default values. S3 automatically applies Server-side encryption (SSE-S3) as the default encryption method for new objects stored in the bucket.
<br>
<br>
<br>
### Step 2: Setting Up CloudFront

Although S3 offers dependable storage, we elevate the performance and global accessibility of our website by harnessing CloudFront, AWS’s Content Delivery Network (CDN). CloudFront efficiently caches and disseminates your website’s content across a global network of edge locations, thereby diminishing latency and enhancing the overall user experience.
<br>
<br>
When creating the distribution, make sure to select the S3 bucket as the Origin Domain, and select “Origin access control settings” under Origin Access. OAC (Origin Access Control) in CloudFront is a feature that allows you to restrict access to your origin server, ensuring that only specified CloudFront distributions can access it. AFTER the creation of the distribution, you will see an option to copy the S3 bucket policy that allows only CloudFront to communicate with the S3 bucket, for now do not worry about this step.

![Screenshot (2205)](https://github.com/cupumelody/cloud-resume/assets/145847069/28ca163d-c4fd-4431-9fe1-72063c3afd65)

Change the viewer protocol to Redirect HTTP to HTTPS to ensure the secure transfer of data.

Also, modify the root object to “index.html,” which will be the default file served when accessing the website.


Click on the “Create Distribution” button and wait for approximately 5 minutes for CloudFront to complete the creation process. Once the distribution is successfully created, return to CloudFront and access the Distributions section. Click on your newly created distribution and go to the Origins tab. Select the desired origin and click on “Edit.” In the Edit menu, you will find an option to copy the bucket policy provided by CloudFront. Copy the policy from there.

After copying the policy, go back to the S3 bucket settings. Access the Permissions tab and scroll down to the bucket policy section. Paste the policy obtained from CloudFront into the designated box, and save the changes.

This policy guarantees that only CloudFront has access to the contents of the bucket, maintaining the privacy of the bucket. Additionally, ensure that your CloudFront distribution and S3 bucket are properly configured to communicate with each other, and you can access the “Distribution domain name” provided in the General settings of your CloudFront distribution.

![Screenshot (2206)](https://github.com/cupumelody/cloud-resume/assets/145847069/e896e684-954d-46b4-ae57-71385fb8e1bc)

However, instead of having a generic website name, we aim to deliver a professional and branded experience, which is why we will register our own domain using Route53. While you can opt for any domain registrar, since we are primarily utilizing AWS services for this project, it is convenient to utilize the native option.
<br>
<br>
<br>
### Step 3: Domain Configuration and SSL Certificates

Keep in mind that the registration cost for most domains in Route53 is approximately $12, but this can vary depending on the top-level domain (TLD) you select.

![Screenshot (2207)](https://github.com/cupumelody/cloud-resume/assets/145847069/58f83d31-aa2a-4b89-8c5c-78a5c1ecc02f)

Once you have purchased and registered your custom domain, the next step is to secure your website by obtaining an SSL certificate from AWS Certificate Manager (ACM) to enable secure communication. You will request a public certificate for your new domain name “yourdomainname.com” and include a wildcard domain “*.yourdomainname.com” to ensure encryption and security for all subdomains under “yourdomainname.com” using the same certificate.

![ezgif-1-bfc1c3024f](https://github.com/cupumelody/cloud-resume/assets/145847069/1cfd0472-3556-41e8-b69d-5c2e5a3d2036)

![ezgif-1-f3211c0d75](https://github.com/cupumelody/cloud-resume/assets/145847069/edb8eb8f-109b-4aff-b093-61e318bd2eca)


You can keep the remaining settings as the default options, optionally create a tag, and proceed to request the certificate.

The certificate will display as “Pending validation” briefly while the certificate authority (CA) verifies domain ownership or control, so please wait until the status changes to “Issued”.




