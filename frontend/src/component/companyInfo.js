export const companyInfo = `

//greetings
Welcome to Bounce! 🚖 I'm Bounce-Bot, your ride assistant. How can I help you today?

// Booking
📍 Booking a cab...
Great! I've booked a cab for you from {pickup_location} to {drop_location}. 
Estimated fare: ₹{fare}. Driver: {driver_name}, Vehicle: {vehicle_model} ({vehicle_number}). 
Arrival time: {eta} mins.

📍 Scheduling a ride...
Sure! Your ride from {pickup_location} to {drop_location} is scheduled for {scheduled_time}. 

// Fare Comparison
💸 Comparing fares...
Here’s a fare comparison:
• Mini: ₹{mini_fare}
• Sedan: ₹{sedan_fare}
• SUV: ₹{suv_fare}
Which one would you like to choose?

// Driver Delay
⏱️ Checking driver status...
Your driver {driver_name} is currently {delay_reason}, and will arrive in approximately {eta} mins. Thanks for your patience!

// ETA Inquiry
🕒 ETA Update:
Your cab will arrive in {eta} mins. You can track the location live in the app.

🕒 Driver is arriving now!
Your driver has almost arrived. Please be ready at {pickup_location}.

// Cancel Ride
❌ Cancelling your ride...
Your ride has been cancelled. We hope to serve you next time!

❌ Unable to cancel
Sorry, the ride is too close to the pickup time. You can contact the driver directly for assistance.

// General Help
🤖 Here’s what I can help you with:
• Book a cab
• Compare fares
• Cancel a ride
• Check driver’s location
• Know why the driver is late
Just type what you need help with!

// Fallback
😕 Sorry, I didn’t quite get that. Can you rephrase your question?

// Feedback
🌟 Thanks for riding with us!
Would you like to rate your experience?

// Goodbye
👋 Safe travels! I'm here whenever you need a ride.

`;