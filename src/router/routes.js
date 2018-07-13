const Routes = {
  Home: '/',
  Pricing: '/pricing',
  Login: '/login',
  Register: '/register',
  Profile: '/profile',
  Booking: '/booking',
  Reference: '/add-reference',
  History: '/history',
  HistoryDetail: '/history/:id',
  Ride: '/ride/:id',
  Feedback: '/feedback',
  Payment: '/payment',
  // Driver Routes
  DriverLogin: '/driver/login',
  Status: '/driver/status',
  ProfileView: '/driver/profile',
  // Admin Routes
  AdminLogin: '/admin/login',
  Admin: '/admin',
  Users: '/admin/users',
  AddDriver: '/admin/add/driver',
  Email: '/admin/email',
  Feedbacks: '/admin/feedbacks',
  Rides: '/admin/rides',
  // Error Routes
  Error404: '/404',
};

export default Routes;
