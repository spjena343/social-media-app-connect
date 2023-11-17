const Notification = require("../models/Notification");

 exports.createNotifications = async(req,res)=> {
  
    try {
        const {recipient,sender, type, post, comment } = req.body;
        const notification = await Notification.create({
          recipient,
          sender,
          type,
          post,
          comment
        });
         await notification.save();
        res.status(201).json(
          {
            message:"notification created",
            
          }
          
          );
      } catch (error) {
        res.status(500).json({ message:error.message});
      }
}
exports.getNotifications = async(req,res)=> {
    try {
      const recipient = req.user._id;
        const notifications = await Notification.find({recipient}).sort({ createdAt: -1 }).populate("recipient sender post");
        if(!notifications || notifications.length == 0){
           return res.json({
            message:"notifications not found"
          })
        }
        else{
        res.json({
          message:"got the notifications",
          notifications,
          
        });
      }
      } catch (error) {
        res.status(500).json({ message:error.message });
      }
}

exports.deleteNotifications = async(req,res) => {
    try {
    
        const result = await Notification.deleteMany({ recipient:req.user._id});
    
        if (result.deletedCount > 0) {
          res.json({ message: 'All notifications cleared successfully' });
        } else {
          res.json({ message: 'No notifications found for the user' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to clear notifications' });
      }
}
