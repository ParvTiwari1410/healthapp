📱 Health Consultation App

A Complete Doctor Consultation & Appointment Booking System (Internship Assignment)

This project is a fully functional mobile application built using React Native (Expo).
It enables users to explore health concerns, select doctors, schedule consultations, make payments, and join video/voice calls with doctors.


---

⭐ Key Features

🔍 1. Explore Health Concerns

Users can browse through top health concerns such as Hypertension, Anxiety, Obesity, Diabetes, Rubella, Hypothermia, Frostbite, etc.

Selecting a concern shows relevant doctors specialized in that area.


👨‍⚕️ 2. Doctor Listing

Displays doctors with:

Name & specialty

Languages

Experience

Consultation fees

Free Call eligibility


Users can Schedule Appointment or Start Free Call.


🎥 3. Choose Consultation Type

Phone Consultation

Video Consultation

Chat Consultation

Each option displays pricing and time limits.


📅 4. Choose Appointment Date

Interactive calendar

Highlights available dates

Displays appointment steps progress bar.


⏰ 5. Select Time Slot

Morning, Afternoon, and Evening slots

User picks preferred time for consultation.


📝 6. Patient Concern Details

User selects:

Type of concern

Severity

Duration (Days/Weeks/Months/Years)



👤 7. Confirm Basic Information

Gender

Age

Height

Weight


✔️ 8. Appointment Confirmation

Shows doctor details

Appointment date & time

Wallet balance

Consultation fee

Option to Make Payment


💰 9. Payment Success

Confirmation screen showing:

Amount paid

Remaining wallet balance

Button to check bookings.



📖 10. My Bookings

Upcoming and Completed appointments

Each appointment card shows:

Doctor name

Specialization

Date & time

Image


Actions:

View Details

Start Call

Check Prescription (Completed ones)



📞 11. Call Flow (ZegoCloud Integration)

Before starting call, user sees a Disclaimer Modal.

On Proceed:

Starts call using Zego UIKit Prebuilt Call


If doctor joins → navigates to video call screen

If doctor does not join in 25 seconds → redirects to “No Answer” page.



---

🧭 Complete User Flow Summary

1. Select Concern ➝ Top health concerns displayed


2. Choose Doctor ➝ Based on selected concern


3. Choose Consultation Type ➝ Phone / Video / Chat


4. Select Appointment Date


5. Select Time Slot


6. Enter Concern Details


7. Confirm Basic Info


8. Appointment Confirmation


9. Make Payment


10. Payment Success


11. My Bookings


12. Start Call (Zego Integration)


13. ✔ Call connects if doctor joins
❌ Redirects to No-Answer if doctor doesn't join




---

🛠️ Technology Stack

Category	Technology

Framework	React Native (Expo)
Navigation	Expo Router
State	React Hooks
UI	Custom components + Ionicons
Calling	Zego UIKit Prebuilt Call for React Native
Device Testing	Expo Go
Language	TypeScript
