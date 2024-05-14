const generateEmailHTML = ({
  title,
  logoSrc,
  verificationToken,
  heading,
  description,
  buttonText,
  companyInfo,
}) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Content</title>
    <style>
        body {
            font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .content {
            text-align: center;
        }

        img {
            max-width: 60%;
            height: auto;
            margin: 0 auto 20px auto;
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            margin-bottom: 20px;
        }

         .button {
            background-color: #06c668;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 16px;
        }
        .button:hover {
            background-color: #05a95c;
        }

        .info {
            color: #93959c;
            margin-top: 20px;
        }

        .info a {
            color: #fcfdff;
            text-decoration: none;
        }

        a { text-decoration: none !important;color: #fff !important;  } 
        a:hover {
          color:#fff !important; 
          text-decoration:none !important;
          cursor:pointer;  
      }
    </style>
</head>

<body>
    <div class="content">
        <img src="${logoSrc}" alt="${title}">
        <h1>${heading}</h1>
        <p>${description}</p>
        <a href="http://localhost:3000/api/verify?token=${verificationToken}" class="button">${buttonText}</a>
        <div class="info">
            <p>Created with love by ${companyInfo}.</p>
        </div>
    </div>
</body>

</html>

`;

export default generateEmailHTML;
