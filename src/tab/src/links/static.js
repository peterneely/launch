import sortBy from 'lodash/sortBy';

const createPath = fileName => `https://peterneely.github.io/icons/${fileName}`;

const links = [
  {
    title: '1Password',
    url: 'http://neelys.1password.com/',
    icon: createPath('1password.png'),
  },
  { title: 'AT&T', url: 'http://www.att.com/', icon: createPath('att.png') },
  {
    title: 'Aetna',
    url: 'https://health.aetna.com/',
    icon: createPath('aetna.png'),
  },
  {
    title: 'Ally',
    url: 'http://secure.ally.com/#/dashboard',
    icon: createPath('ally.jpg'),
  },
  {
    title: 'AlternativeTo',
    url: 'http://alternativeto.net/',
    icon: createPath('alternativeto.png'),
  },
  {
    title: 'Amazon',
    url: 'http://amazon.com/',
    icon: createPath('amazon.png'),
  },
  {
    title: 'American Express',
    url: 'http://www.americanexpress.com/',
    icon: createPath('amex.png'),
  },
  {
    title: 'Apple Developer Forums',
    url: 'http://forums.developer.apple.com/welcome',
    icon: createPath('xcode.png'),
  },
  {
    title: 'Apple',
    url: 'http://www.apple.com/',
    icon: createPath('apple.png'),
  },
  {
    title: 'Bank of America',
    url: 'http://www.bankofamerica.com/',
    icon: createPath('bofa.png'),
  },
  {
    title: 'Best Parking',
    url: 'http://losangeles.bestparking.com/',
    icon: createPath('bestparking.png'),
  },
  {
    title: 'Bitbucket',
    url: 'http://bitbucket.org/dashboard/overview',
    icon: createPath('bitbucket.png'),
  },
  {
    title: 'CanIUse',
    url: 'http://caniuse.com/',
    icon: createPath('caniuse.png'),
  },
  {
    title: 'Chase',
    url: 'http://cards.chase.com/cc/Account/Activity/561745339',
    icon: createPath('chase.png'),
  },
  {
    title: 'Cigna',
    url: 'http://my.cigna.com/web/secure/my/coverage/dental',
    icon: createPath('cigna.png'),
  },
  {
    title: 'Code School',
    url: 'http://www.codeschool.com/',
    icon: createPath('codeschool.jpg'),
  },
  {
    title: 'CodeSandbox',
    url: 'http://codesandbox.io/s/vanilla',
    icon: createPath('codesandbox.png'),
  },
  {
    title: 'Craigslist',
    url:
      'http://losangeles.craigslist.org/search/cta?sort=date&max_price=2500&auto_title_status=1&auto_bodytype=8&query=torrance',
    icon: createPath('craigslist.png'),
  },
  {
    title: 'Credit Karma',
    url: 'http://www.creditkarma.com/dashboard',
    icon: createPath('creditkarma.png'),
  },
  {
    title: 'Dropbox',
    url: 'http://www.dropbox.com/home',
    icon: createPath('dropbox.jpg'),
  },
  {
    title: 'ES6',
    url: 'http://kangax.github.io/compat-table/es6/',
    icon: createPath('es6.png'),
  },
  {
    title: 'Egghead',
    url: 'http://egghead.io/',
    icon: createPath('egghead.jpg'),
  },
  {
    title: 'Experian ID Notify',
    url: 'http://services.idnotify.com/dashboard',
    icon: createPath('idnotify.png'),
  },
  {
    title: 'Facebook',
    url: 'http://www.facebook.com/login.php',
    icon: createPath('fb.png'),
  },
  { title: 'Fast', url: 'http://fast.com/', icon: createPath('fast.png') },
  {
    title: 'Feedly',
    url: 'http://feedly.com/',
    icon: createPath('feedly.png'),
  },
  {
    title: 'Firebase',
    url: 'http://console.firebase.google.com/u/0/',
    icon: createPath('firebase.png'),
  },
  {
    title: 'FlightAware',
    url: 'http://flightaware.com/',
    icon: createPath('flightaware.png'),
  },
  {
    title: 'Geico',
    url: 'http://ecams.geico.com/ecams/login.xhtml?msgid=MSG150_8',
    icon: createPath('geico.jpeg'),
  },
  { title: 'Giphy', url: 'http://giphy.com/', icon: createPath('giphy.png') },
  {
    title: 'GitHub Peter',
    url: 'http://github.com/peterneely?tab=repositories',
    icon: createPath('github-peter.png'),
  },
  {
    title: 'GitHub Sony',
    url: 'http://github.sie.sony.com/SIE-Private/SCP',
    icon: createPath('github-sony.png'),
  },
  {
    title: 'Google Flights',
    url: 'http://www.google.com/flights/',
    icon: createPath('flights.png'),
  },
  {
    title: 'Google One',
    url: 'http://one.google.com/',
    icon: createPath('googleOne.jpg'),
  },
  {
    title: 'Google Translate',
    url: 'http://translate.google.com/',
    icon: createPath('translate.png'),
  },
  {
    title: 'Gravatar',
    url: 'http://en.gravatar.com/',
    icon: createPath('gravatar.jpg'),
  },
  {
    title: 'HTML5 Please',
    url: 'http://html5please.com/',
    icon: createPath('html5please.jpg'),
  },
  {
    title: 'Harvest',
    url: 'http://pneely.harvestapp.com/time',
    icon: createPath('harvest.png'),
  },
  {
    title: 'Heroku',
    url: 'http://dashboard.heroku.com/apps',
    icon: createPath('heroku.png'),
  },
  {
    title: 'Homebridge',
    url:
      'http://financingaccountconnect.com/Homebridge/LoanService/accounts/accountDetail/0',
    icon: createPath('homebridge.jpg'),
  },
  { title: 'Hulu', url: 'http://www.hulu.com/', icon: createPath('hulu.jpg') },
  { title: 'IMDB', url: 'http://www.imdb.com/', icon: createPath('imdb.png') },
  { title: 'JWT', url: 'http://jwt.io/', icon: createPath('jwt.svg') },
  {
    title: 'Jen Simmons Labs',
    url: 'http://labs.jensimmons.com/',
    icon: createPath('jenlabs.png'),
  },
  {
    title: 'JustWatch',
    url: 'http://www.justwatch.com/us/provider/netflix',
    icon: createPath('justwatch.png'),
  },
  {
    title: 'Kaiser Permanente',
    url:
      'http://healthy.kaiserpermanente.org/health/mycare/consumer/my-health-manager',
    icon: createPath('kaiser.png'),
  },
  {
    title: "King's Harbor",
    url: 'http://kingsharbor.org/',
    icon: createPath('khc.jpg'),
  },
  {
    title: 'LA Fitness',
    url: 'http://www.lafitness.com/Pages/billinghistory.aspx?scr=receipts',
    icon: createPath('lafitness.png'),
  },
  {
    title: 'LinkedIn',
    url: 'http://www.linkedin.com/in/pgneely',
    icon: createPath('linkedin.jpg'),
  },
  {
    title: 'Lloyds Bank',
    url: 'http://online.lloydsbank.co.uk/personal/logon/login.jsp',
    icon: createPath('lloyds.jpg'),
  },
  {
    title: 'Logix',
    url: 'http://olb.logixbanking.com/User/MainAccounts/List',
    icon: createPath('logix.png'),
  },
  {
    title: 'Meetup',
    url: 'http://www.meetup.com/find/',
    icon: createPath('meetup.png'),
  },
  {
    title: 'Microsoft',
    url:
      'http://stores.office.com/myaccount/home.aspx?ui=en-US&rs=en-GB&ad=GB&s=1&auth=0&fromAR=3',
    icon: createPath('microsoft.png'),
  },
  {
    title: 'Mint',
    url: 'http://wwws.mint.com/overview.event',
    icon: createPath('mint.png'),
  },
  {
    title: 'MongoDB',
    url:
      'http://cloud.mongodb.com/v2/5b29a4710bd66b2c58f13b28#clusters?tooltip=nds.security&step=0',
    icon: createPath('mongodb-atlas.png'),
  },
  {
    title: 'MyCarFax',
    url: 'http://www.mycarfax.com/',
    icon: createPath('mycarfax.png'),
  },
  {
    title: 'Netflix DVD',
    url: 'http://dvd.netflix.com/MemberHome',
    icon: createPath('netflixdvd.jpg'),
  },
  {
    title: 'Netflix',
    url: 'http://www.netflix.com/',
    icon: createPath('netflix.png'),
  },
  {
    title: 'Node Compatibility',
    url: 'http://node.green/',
    icon: createPath('nodegreen.png'),
  },
  {
    title: 'Our Groceries',
    url: 'http://www.ourgroceries.com/your-lists/list/IkFiAxpB0g3JdigiZj_U3q',
    icon: createPath('ourgroceries.png'),
  },
  {
    title: 'Parallels Access',
    url: 'http://access.parallels.com/#/computers/',
    icon: createPath('parallels.jpg'),
  },
  {
    title: 'ParkMe',
    url: 'http://www.parkme.com/los-angeles-parking',
    icon: createPath('parkme.png'),
  },
  {
    title: 'PayPal',
    url: 'http://www.paypal.com/myaccount/home',
    icon: createPath('paypal.png'),
  },
  {
    title: 'PlaneFinder',
    url: 'http://planefinder.net/',
    icon: createPath('planefinder.png'),
  },
  {
    title: 'Plunkr',
    url: 'http://plnkr.co/edit/?p=catalogue',
    icon: createPath('plunkr.png'),
  },
  {
    title: 'Pluralsight',
    url: 'http://www.pluralsight.com/',
    icon: createPath('pluralsight.png'),
  },
  {
    title: 'Portainer',
    url: 'http://localhost:9000/#/containers/',
    icon: createPath('portainer.png'),
  },
  {
    title: 'PowerSchool',
    url: 'http://torrance.powerschool.com/guardian/home.html',
    icon: createPath('powerschool.png'),
  },
  {
    title: 'Providence',
    url: 'http://mychartor.providence.org/mychart/',
    icon: createPath('providence.png'),
  },
  {
    title: 'Ray Wenderlich',
    url: 'http://www.raywenderlich.com/',
    icon: createPath('raywenderlich.png'),
  },
  {
    title: 'React Style Guide: AirBnB',
    url: 'http://github.com/airbnb/javascript/tree/master/react#naming',
    icon: createPath('react.png'),
  },
  {
    title: 'Regex 101',
    url: 'http://regex101.com/',
    icon: createPath('regex101.jpg'),
  },
  {
    title: 'Regexr',
    url: 'http://www.regexr.com/',
    icon: createPath('regexr.png'),
  },
  {
    title: 'Repl-it',
    url: 'http://repl.it/languages/javascript',
    icon: createPath('replit.png'),
  },
  {
    title: 'SCE',
    url: 'http://www.sce.com/wps/myportal/home/mysce/myaccount',
    icon: createPath('sce.jpg'),
  },
  {
    title: 'SVG Editor',
    url: 'http://petercollingridge.appspot.com/svg-editor',
    icon: createPath('svg.png'),
  },
  {
    title: 'Seat Guru',
    url: 'http://www.seatguru.com/',
    icon: createPath('seatguru.jpg'),
  },
  {
    title: 'Shazam',
    url: 'http://www.shazam.com/myshazam',
    icon: createPath('shazam.png'),
  },
  {
    title: 'SoCalGas',
    url: 'http://myaccount.socalgas.com/myAccount/newscg.portal',
    icon: createPath('socalgas.jpg'),
  },
  {
    title: 'Spectrum',
    url: 'http://www.spectrum.net/login/',
    icon: createPath('spectrum.png'),
  },
  {
    title: 'Stackblitz',
    url: 'http://stackblitz.com/',
    icon: createPath('stackblitz.png'),
  },
  {
    title: 'Synchrony',
    url:
      'http://consumercenter.mysynchrony.com/consumercenter/homeaction.do?strutsToken=tokenValue&tokenValue=90YB-29G9-Z06G-JIJV-3QGD-W61K-5L9D-648B-EMZQ-01IQ',
    icon: createPath('synchrony.png'),
  },
  {
    title: 'Team Treehouse',
    url: 'http://teamtreehouse.com/library',
    icon: createPath('treehouse.png'),
  },
  {
    title: 'Thinkster',
    url: 'http://thinkster.io/',
    icon: createPath('thinkster.png'),
  },
  {
    title: 'Trello',
    url: 'http://trello.com/',
    icon: createPath('trello.png'),
  },
  {
    title: 'TurboTax',
    url: 'http://myturbotax.intuit.com/inprogress/',
    icon: createPath('turbotax.jpg'),
  },
  {
    title: 'TutsPlus',
    url: 'http://tutsplus.com/account/courses',
    icon: createPath('tuts.png'),
  },
  {
    title: 'Uber',
    url: 'http://riders.uber.com/trips',
    icon: createPath('uber.jpg'),
  },
  {
    title: 'Udemy',
    url: 'http://www.udemy.com/courses/',
    icon: createPath('udemy.svg'),
  },
  {
    title: 'VSP',
    url: 'http://www.vsp.com/benefits-detail.html',
    icon: createPath('vsp.JPG'),
  },
  {
    title: 'Venmo',
    url: 'http://venmo.com/peterneely',
    icon: createPath('venmo.png'),
  },
  {
    title: 'W3 Schools',
    url: 'https://www.w3schools.com/colors/colors_mixer.asp',
    icon: createPath('colors.gif'),
  },
  {
    title: 'Yelp',
    url: 'http://www.yelp.com/torrance-ca-us',
    icon: createPath('yelp.jpeg'),
  },
  {
    title: 'YouTube',
    url: 'http://www.youtube.com/',
    icon: createPath('youtube.svg'),
  },
  { title: 'eBay', url: 'http://www.ebay.com/', icon: createPath('ebay.jpg') },
  {
    title: 'px to em',
    url: 'http://pxtoem.com/',
    icon: createPath('pxtoem.png'),
  },
];

export const getDomain = url => {
  const matches = url.match(/^https?:\/\/([^/:?#]+)(?:[/:?#]|$)/i);
  return matches ? matches[1] : url;
};

const { domainLinks, linksByDomain } = links.reduce(
  (info, link) => {
    const { url } = link;
    const domain = getDomain(url);
    const domainLink = { ...link, domain };
    info.domainLinks.push(domainLink);
    info.linksByDomain[domain] = domainLink;
    return info;
  },
  { domainLinks: [], linksByDomain: {} }
);
const sortedLinks = sortBy(domainLinks, ({ title = '' }) =>
  title.toLowerCase()
);

export { domainLinks, linksByDomain, sortedLinks };