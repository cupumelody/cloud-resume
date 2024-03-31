# Stage 4: Implementing the View Counter Feature in Website Code

In this stage, we will update the website code to incorporate the view count obtained from the API and display it on the website.

### Step 1: Create index.js file and Add JavaScript Code 
If you don’t already have an `index.js` file in the root folder of your website, you need to create one and add the following JavaScript code to it.

```
const counter = document.querySelector(".counter-number");
async function updateCounter() {
    let response = await fetch("Your-LambdaFunction-URL");
    let data = await response.json();
    counter.innerHTML = ` This page has ${data} Views!`;
}

updateCounter();
```

![Screenshot (2214)](https://github.com/cupumelody/cloud-resume/assets/145847069/e24746b9-f9cb-439b-a6ab-fc32552cbf38)

This JavaScript code retrieves the view count data from Lambda using the fetch function and updates the content of an HTML element with the class "counter-number" to display the count. The updateCounter function is responsible for displaying the view count, and it is automatically executed when the page loads.
<br>
<br>
<br>
### Step 2: Reference `index.js` in `index.html`

Now that we have created the javascript code, we need to reference it within our `index.html` file. You can create a script tag just before closing your body, which improves website loading performance by allowing the HTML content to render first before executing the JavaScript code.

![Screenshot (2215)](https://github.com/cupumelody/cloud-resume/assets/145847069/44fa2144-3e0f-4706-8c86-1c67e13c09a1)
<br>
<br>
<br>
### Step 3: Adding the Counter Display Element 

To incorporate the view counter on your webpage, insert the following code snippet `<div class="counter-number"></div>` (in my case `<p class="counter-number" class="lead mb-5"></p>`) wherever you wish to display the counter. For reference, I placed mine in the header section of my webpage.

![Screenshot (2216)](https://github.com/cupumelody/cloud-resume/assets/145847069/06c2fe24-eb11-4ff4-af26-e6461b690357)
