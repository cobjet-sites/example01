if (Meteor.isClient) {
  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.map(function () {
    this.route('index', {
      path: '/'
    });

    this.route('about', {
      path: '/about',
      waitOn: function() {
        return Meteor.subscribe('voltagePages');
      },
      action: function() {
        Voltage.render(this);
      }
    });
  });
}

if (Meteor.isServer) {
  function initialUser() {
    Accounts.createUser({
      email: 'a@a.com',
      password: 'aaaaaaaa'
    });
  };

  function initialPage() {
    Page.create({
      name: "about",
      text: "<img src=\"http://placekitten.com/g/300/300\" align=\"right\">\n\n### A Meteor Voltage Example Page\n\nThis is an example of a static, markdown page generated by the  [`voltage`](http://github.differential.io/meteor-voltage) package.\n\nStandard markdown works. Including **bold**, and _italic_ text. \n\n* Lists\n* work\n* really\n* well\n* too!\n\n> Isn't that kitten cute?\n\nThis page was created by adding this route:\n\n```\nthis.route('about', {\n  path: '/about',\n  waitOn: function() {\n    return Meteor.subscribe('voltagePages');\n  },\n  action: function() {\n    Voltage.render(this);\n  }\n});\n```\n"
    });
  };

  Meteor.startup(function () {
    if (! Meteor.users.find().count()) {
      initialUser();
    }

    if (! Page.count()) {
      initialPage();
    }

    Meteor.setInterval(function() {
      Page.destroyAll();
      Meteor.users.remove({});
      initialUser();
      initialPage();
    }, 1000 * 3600); // 1 hour
  });
}
