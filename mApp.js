Router.route('/users',{
  template: 'users',
  name: 'users'
});

Router.route('/register',{
  template: 'register',
  name: 'register'
});
Router.route('/login',{
  template: 'login',
  name: 'login'
});

Router.route('/home',{
  template: 'home',
  name: 'home'
});



Router.configure({
    layoutTemplate: 'main'
});

Router.route('/added_first', {
  template: 'first',
  name: 'first'
})

Router.route('/added_second', {
  template: 'second',
  name: 'sedond'
})



Router.route('/added_third', {
  template: 'third',
  name: 'third'
})
