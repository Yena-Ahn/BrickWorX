# :large_blue_diamond: BrickWorX :large_blue_diamond:

This web application is designed to simplify the process of managing grades and marking assignments for educators. It provides several key features to streamline the grading process and enhance efficiency. With this application, educators can easily upload gradebook CSV files, create custom marking rubrics, mark assignments, leave feedback for students, and track the marking status of all student submissions. Additionally, educators can download the filled-out gradebook after marking to seamlessly integrate the updated grades into *Canvas*.

## :key: Key Features
#### 1. Upload Canvas Gradebook CSV
Easily import your Canvas gradebook by uploading the CSV file directly into the application. The system will automatically parse the data and populate the gradebook with student information, assignment details, and previous grades.
#### 2. Download filled out Gradebook after marking
After marking assignments and updating the grades, conveniently download the filled-out gradebook in CSV format. This file can be seamlessly integrated back into your Canvas, ensuring accurate and up-to-date records.
#### 3. Create custom marking rubrics for markers
Tailor your marking rubrics to fit the specific requirements of your assignments. Create and save custom marking rubrics that can be reused across different assignments. This feature allows for consistent and fair grading practices.
#### 4. Mark assignments with a few clicks
Streamline the grading process with a user-friendly interface that enables you to mark assignments quickly. With a few clicks, you can assign grades based on the custom marking rubrics and easily navigate between different student submissions.
#### 5. Leave feedback for students
Provide constructive feedback to students on their assignments directly through the web application. You can leave comments, suggestions, or praise to help students understand their strengths and areas for improvement.
#### 6. View marking status of all student's submissions
Track the progress of grading for all student submissions in one centralized location. Easily identify which assignments have been marked and those that still require grading. This feature ensures efficient management of the grading workflow.

## :dark_sunglasses: Technologies Used
* JavaScript
* React
* React-Bootstrap
* Express.js
* MySQL
* Amazon AWS
  - S3
  - EC2

## :wrench: Dependencies
#### [Backend](https://github.com/uoa-compsci399-s1-2023/project-team-18/blob/upgradesToCreation/express_project/package.json)
    "@aws-sdk/client-s3": "^3.319.0",
    "@json2csv/formatters": "^6.1.3",
    "aws-sdk": "^2.1365.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "csv": "^6.2.10",
    "csv-parse": "^5.3.8",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "json2csv": "^6.0.0-alpha.2",
    "md5": "^2.3.0",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^2.10.0",
    "mysql": "^2.18.1",
    "mysql2": "^3.2.3",
    "request": "^2.88.2",
    "serve-index": "^1.9.1",
    "sqlite3": "^5.1.6",
    "util": "^0.12.5"
#### [Frontend](https://github.com/uoa-compsci399-s1-2023/project-team-18/blob/upgradesToCreation/react-test-project/package.json)
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.6",
    "bootstrap": "^5.2.3",
    "lodash": "^4.17.21",
    "react": "^18.2.0",
    "react-aws-s3": "^1.5.0",
    "react-bootstrap": "^2.7.4",
    "react-bootstrap-icons": "^1.10.3",
    "react-dom": "^18.2.0",
    "react-icons": "^4.8.0",
    "react-router-dom": "^6.9.0",
    "react-scripts": "5.0.1",
    "styled-components": "^5.3.9",
    "uuid": "^9.0.0",
    "web-vitals": "^2.1.4"

## :heavy_check_mark: Getting Started
1. Use `npm install` to install all the necessary dependencies.
2. Start the application by running `npm start` on both backend and frontend apps. Open two separate terminals to run both apps.
    ```console
      foo@bar % cd express_project
      foo@bar % npm start
    ```
    ```console
      foo@bar % cd react-test-project
      foo@bar % npm start
    ```
3. Access the web application through your browser at `http://localhost:3000`.
4. **Or access the deployed web application by visiting http://52.64.233.59:3000/.**

## :question: How to Use
link to demo video

## :thought_balloon: Future Plans

We have exciting plans to further enhance ***BrickWorX*** and provide additional features and improvements. Here are some of our future plans:

#### 1. Integration with Learning Management Systems (LMS)
   We aim to integrate our application with popular LMS platforms such as Canvas or Moodle. This integration will enable seamless synchronization of grades, assignments, and student information between the Gradebook Management Web Application and the LMS.
#### 2. Integration with PDF Submission
 To enhance the grading experience, we plan integrate the ability to view students' work directly within the web application. Markers will be able to access and review students' submitted PDF files seamlessly, improving the efficiency and accuracy of the grading process.

#### 3. Version Control of Rubrics and Marking
We plan to introduce version control for rubrics and marking. All changes made to rubrics and marking will be saved in the database, allowing users to access and review previous versions. This feature will provide transparency and facilitate collaboration among educators.

#### 4.User Accounts
We plan to implement user account functionality, allowing educators to create personalized accounts. User accounts will provide a personalized experience, with features such as saved preferences, assignment history, and easy access to previously marked submissions.

#### 5. Permission Tiers 
We plan to introduce permission tiers for users to ensure proper access control. Instructors will have exclusive access to rubric creation, while markers will be limited to marking assignments. This feature will enhance security and maintain the integrity of the grading process.

These are just a few of the exciting features and enhancements we have planned. We value feedback from our users, and their needs and suggestions will play a vital role in shaping the future of our application. Stay tuned for updates and announcements as we continue to evolve and improve ***BrickWorX***.

## Project Management Tool

## :sparkles: Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Acknowledgements
