import nodemailer from 'nodemailer';

import parseRes from './parseRes';

/**
 * [description]
 * @param  {[type]} to      发送对象，支持单个发送 String，和多个发送 Array
 * @param  {[type]} subject 邮件标题
 * @param  {[type]} content 邮件内容 html
 * @return {[type]}         [description]
 */
export function send (to, subject, content) {
  const transporter = nodemailer.createTransport({  
    host: 'smtpdm.aliyun.com',
    port: 465,
    secureConnection: true, // use SSL
    auth: {  
      user: 'feili@facemagic888.com',  
      pass: 'FAcemagic2017'
    }  
  });


  if (to instanceof Array) {
    to = to.join(',');
  }

  const mailOptions = {
    from: 'feili@facemagic888.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: 'Hello world?', // plain text body
    html: content // html body
  };

  return new Promise ((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({
          err: true,
          data: parseRes.EMAIL_ERROR(error.toString())
        });
        return;
      }
      resolve();
    });
  }); 
};

function buildRegisterEmail (name = '菲友', checkUrl) {
  const content = `
    <p>尊敬的 ${name}:</p>
    <p>您好，欢迎注册菲麦，点击链接完成注册验证：<a href="${checkUrl}">点此验证</a></p>
    <p></p>
    <p>链接无效？请复制黏贴下面的链接至浏览器地址栏打开：</p>
    <p>${checkUrl}</p>
  `;
  return content;
}

export async function sendRegister (to, name, checkUrl) {
  const content = buildRegisterEmail(name, checkUrl);
  return await send(to, '注册验证--菲麦', content);
};

function buildNoticeEmail (name = '骚年') {
  let day = new Date().getDay();
  switch (day) {
  case 0: 
    day = '周日';
    break;
  case 1:
    day = '周一';
    break;
  case 2:
    day = '周二';
    break;
  case 3:
    day = '周三';
    break;
  case 4:
    day = '周四';
    break;
  case 5:
    day = '周五';
    break;
  case 6:
    day = '周六';
  }
  const content = `
    <p>${name}同学:</p>
    <p>今天是<span style="font-weight: bold;">${day}</span>洛</p>
    <p>嫑忘记到菲麦前端周刊录入精选文章，集齐七篇文章，菲麦就可以召唤神龙，还不快快行动起来！！！</p>
    <p></p>
    <p>如果你已经录入过文章了，要不然再来一篇吧，小菲送你一个飞吻~~</p>
    <p></p>
    <p><a href="http://dm.facemagic888.com/weekly-admin.html">点此前往</a></p>
  `;
  return content;
}

export function sendNotice (emails) {
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const content = buildNoticeEmail(email.nickName);
    send(email.email, '发文提醒--菲麦', content);
  }
}


