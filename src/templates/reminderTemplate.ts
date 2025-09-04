export const reminderTemplate = (message: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #ff4d4f;">⚠️ Alert Notification</h2>
    <p>${message}</p>
    <p style="margin-top: 20px; color: #888;">- Your App Team</p>
  </div>
`;
