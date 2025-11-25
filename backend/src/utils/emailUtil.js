import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendStatusUpdateEmail = async (userEmail, userName, reportTitle, newStatus) => {
  try {
    const statusIndonesian = {
      pending: "Menunggu",
      progress: "Dalam Proses",
      done: "Selesai"
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Update Status Laporan: ${reportTitle}`,
      html: `
        <h2>Laporan Anda Telah Diperbarui</h2>
        <p>Halo ${userName},</p>
        <p>Laporan Anda "<strong>${reportTitle}</strong>" telah diperbarui dengan status:</p>
        <h3 style="color: #3b82f6;">${statusIndonesian[newStatus] || newStatus}</h3>
        <p>Terima kasih atas kontribusi Anda dalam memperbaiki lingkungan kami!</p>
        <p>Salam,<br>Tim FixIT</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export const sendNotificationEmail = async (userEmail, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      html: message
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${userEmail}`);
  } catch (err) {
    console.error("Error sending notification email:", err);
  }
};
