function loginTemplateHTML(
  BUCKET_URL_PREFIX,
  DOMAIN_NAME,
  email,
  token,
  emailEncoded
) {
  const st = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
    <title>...</title>
    <style>
        @font-face {
            font-family: 'QuatroBold';
            src: url("${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.eot");
            /* IE9*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.eot?#iefix') format('embedded-opentype');
            /* IE6-IE8 */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.woff2') format('woff2');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.woff') format('woff');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.ttf') format('truetype');
            /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_bold/dda013312f72e26a4bcc7df56fb8ce29.svg#QuatroBold') format('svg');
            /* iOS 4.1- */
        }

        @font-face {
            font-family: 'Quatro';
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.eot');
            /* IE9*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.eot?#iefix') format('embedded-opentype');
            /* IE6-IE8 */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.woff2') format('woff2');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.woff') format('woff');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.ttf') format('truetype');
            /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_regular/17ae0aa7804ff40b20696df1008501d7.svg#Quatro');
        }

        @font-face {
            font-family: 'QuatroLight';
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.eot');
            /* IE9*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.eot?#iefix') format('embedded-opentype');
            /* IE6-IE8 */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.woff2') format('woff2');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.woff') format('woff');
            /* chrome、firefox */
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.ttf') format('truetype');
            /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
            src: url('${BUCKET_URL_PREFIX}/email/fonts/quatro_light/969b2305b96bde01825b0b368bc2c181.svg#QuatroLight') format('svg');
            /* iOS 4.1- */
        }

        @media (max-width: 420px) {
            .main-table {
                height: 550px !important;
            }

            .left-image {
                width:110px !important;
            }

            .text-side-padding {
                width: 3% !important;
            }

            .text-p {
                text-align: justify;
            }


        }
        @media (max-width: 500px) {
            .button-padding {
                width: 20% !important;
            }
        }

        @media (min-width: 421px) {
            .main-table {
                height: 600px !important;
            }

            .text-side-padding {
                width: 10% !important;
            }
        }


    </style>
</head>
<body>
<table cellpadding="0" cellspacing="0" border="0" width="100%"
       style="background: #ffffff; min-width: 340px; font-size: 1px; line-height: normal;">
    <tr>
        <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" class="table700"
                   style="max-width: 700px; min-width: 320px; background: #ffffff;">
                <tr>
                    <td align="center" valign="top">
                        <table class="main-table"
                               style='width: 97%; height: 600px; background-size: contain; background-image: url("${BUCKET_URL_PREFIX}/email/images/wave1.png"); background-position: bottom; background-repeat: no-repeat;'>
                            <tr>
                                <td style="text-align: center" height="92" colspan="3">
                                  <div style="display: block; max-height: 92px; text-align: center;">
                                      <img src="${BUCKET_URL_PREFIX}/email/images/Group18.png" alt="img" height="92" border="0" style="display: block; height: 92px; max-width: 100%; margin: auto;" />
                                  </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="150" class="left-image">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           style="width: 100%; height: 100%;">
                                        <tr>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img class="rightImg"
                                                     src="${BUCKET_URL_PREFIX}/email/images/Group196.png"
                                                     border="0" style="display: block; width: 150px; max-width: 100%;"/>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           style="width: 100%; height: 100%">
                                        <tr>
                                            <td colspan="3" height="40"></td>
                                        </tr>
                                        <tr>
                                            <td width="40" class="text-side-padding"></td>
                                            <td height="50">
                                                <span style="font-family: Quatro, Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 30px; line-height: 32px;">Hi!</span>
                                            </td>
                                            <td width="40" class="text-side-padding"></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td height="100">
                                                <table cellpadding="0" cellspacing="0" border="0"
                                                       style="width: 100%; height: 100%">
                                                    <tr>
                                                        <td colspan="2" class="text-p">
                                                            <span style="font-family: Quatro, Arial, Tahoma, Geneva, sans-serif; color: #827c85; font-size: 16px; line-height: 23px; margin: 10px 0;">
                                                                We received a request to log in to your Daily Idea account <b><span style="color: #827c85;">${email}</span></b>. Click this button to log in:
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" width="15"
                                                            style="width: 15px; max-width: 15px; min-width: 15px; font-size: 15px; line-height: 15px;">
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table cellpadding="0" cellspacing="0" border="0"
                                                                   style="width: 100%">
                                                                <tr>
                                                                    <td class="button-padding" style="width: 33%"></td>
                                                                    <td style="text-align: center; background-image: linear-gradient(to left, #ffdf01, #ffb92d); background-color: #ffd725"
                                                                        height="40">
                                                                        <a class="big-btn"
                                                                           style="text-decoration:none; font-family: Quatro, Arial, Tahoma, Geneva, sans-serif; color: white; font-size: 16px; line-height: 40px; width: 100%; display: block;"
                                                                           href="https://${DOMAIN_NAME}/auth/verify?code=${token}&email=${emailEncoded}">LOGIN</a>
                                                                    </td>
                                                                    <td class="button-padding" style="width: 33%"></td>
                                                                </tr>
                                                            </table>

                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" width="15"
                                                            style="width: 15px; max-width: 15px; min-width: 15px; font-size: 15px; line-height: 15px;">
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" class="text-p">
                                                            <span style="font-family: Quatro, Arial, Tahoma, Geneva, sans-serif; color: #827c85; font-size: 16px; line-height: 23px; margin: 10px 0;">
                                                                If you did not request this, you can ignore this email! The only way anybody can log in to your account is via links sent to your email.
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
`;
  return st;
}

module.exports.loginTemplateHTML = loginTemplateHTML;
