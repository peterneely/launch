import sortBy from 'lodash/sortBy';

const createPath = fileName => `https://peterneely.github.io/icons/${fileName}`;

const links = [
  {
    title: '1Password',
    url: 'http://neelys.1password.com/',
    image: createPath('1password.png'),
  },
  { title: 'AT&T', url: 'http://www.att.com/', image: createPath('att.png') },
  {
    title: 'Aetna',
    url: 'https://health.aetna.com/',
    image: createPath('aetna.png'),
  },
  {
    title: 'Ally',
    url: 'http://secure.ally.com/#/dashboard',
    image: createPath('ally.jpg'),
  },
  {
    title: 'AlternativeTo',
    url: 'http://alternativeto.net/',
    image: createPath('alternativeto.png'),
  },
  {
    title: 'Amazon',
    url: 'http://amazon.com/',
    image: createPath('amazon.png'),
  },
  {
    title: 'American Express',
    url: 'http://www.americanexpress.com/',
    image: createPath('amex.png'),
  },
  {
    title: 'Apple Developer Forums',
    url: 'http://forums.developer.apple.com/welcome',
    image: createPath('xcode.png'),
  },
  {
    title: 'Apple',
    url: 'http://www.apple.com/',
    image: createPath('apple.png'),
  },
  {
    title: 'Bank of America',
    url: 'http://www.bankofamerica.com/',
    image: createPath('bofa.png'),
  },
  {
    title: 'Best Parking',
    url: 'http://losangeles.bestparking.com/',
    image: createPath('bestparking.png'),
  },
  {
    title: 'Bitbucket',
    url: 'http://bitbucket.org/dashboard/overview',
    image: createPath('bitbucket.png'),
  },
  {
    title: 'CanIUse',
    url: 'http://caniuse.com/',
    image: createPath('caniuse.png'),
  },
  {
    title: 'Chase',
    url: 'http://cards.chase.com/cc/Account/Activity/561745339',
    image: createPath('chase.png'),
  },
  {
    title: 'Cigna',
    url: 'http://my.cigna.com/web/secure/my/coverage/dental',
    image: createPath('cigna.png'),
  },
  {
    title: 'Code School',
    url: 'http://www.codeschool.com/',
    image: createPath('codeschool.jpg'),
  },
  {
    title: 'CodeSandbox',
    url: 'http://codesandbox.io/s/vanilla',
    image: createPath('codesandbox.png'),
  },
  {
    title: 'Craigslist',
    url:
      'http://losangeles.craigslist.org/search/cta?sort=date&max_price=2500&auto_title_status=1&auto_bodytype=8&query=torrance',
    image: createPath('craigslist.png'),
  },
  {
    title: 'Credit Karma',
    url: 'http://www.creditkarma.com/dashboard',
    image: createPath('creditkarma.png'),
  },
  {
    title: 'Dropbox',
    url: 'http://www.dropbox.com/home',
    image: createPath('dropbox.jpg'),
  },
  {
    title: 'ES6',
    url: 'http://kangax.github.io/compat-table/es6/',
    image: createPath('es6.png'),
  },
  {
    title: 'Egghead',
    url: 'http://egghead.io/',
    image: createPath('egghead.jpg'),
  },
  {
    title: 'Experian ID Notify',
    url: 'http://services.idnotify.com/dashboard',
    image: createPath('idnotify.png'),
  },
  {
    title: 'Facebook',
    url: 'http://www.facebook.com/login.php',
    image: createPath('fb.png'),
  },
  { title: 'Fast', url: 'http://fast.com/', image: createPath('fast.png') },
  {
    title: 'Feedly',
    url: 'http://feedly.com/',
    image: createPath('feedly.png'),
  },
  {
    title: 'Firebase',
    url: 'http://console.firebase.google.com/u/0/',
    image: createPath('firebase.png'),
  },
  {
    title: 'FlightAware',
    url: 'http://flightaware.com/',
    image: createPath('flightaware.png'),
  },
  {
    title: 'Geico',
    url: 'http://ecams.geico.com/ecams/login.xhtml?msgid=MSG150_8',
    image: createPath('geico.jpeg'),
  },
  { title: 'Giphy', url: 'http://giphy.com/', image: createPath('giphy.png') },
  {
    title: 'GitHub Peter',
    url: 'http://github.com/peterneely?tab=repositories',
    image: createPath('github-peter.png'),
  },
  {
    title: 'GitHub Sony',
    url: 'http://github.sie.sony.com/SIE-Private/SCP',
    image: createPath('github-sony.png'),
  },
  {
    title: 'Google Flights',
    url: 'http://www.google.com/flights/',
    image: createPath('flights.png'),
  },
  {
    title: 'Google One',
    url: 'http://one.google.com/',
    image: createPath('googleOne.jpg'),
  },
  {
    title: 'Google Translate',
    url: 'http://translate.google.com/',
    image: createPath('translate.png'),
  },
  {
    title: 'Gravatar',
    url: 'http://en.gravatar.com/',
    image: createPath('gravatar.jpg'),
  },
  {
    title: 'HTML5 Please',
    url: 'http://html5please.com/',
    image: createPath('html5please.jpg'),
  },
  {
    title: 'Harvest',
    url: 'http://pneely.harvestapp.com/time',
    image: createPath('harvest.png'),
  },
  {
    title: 'Heroku',
    url: 'http://dashboard.heroku.com/apps',
    image: createPath('heroku.png'),
  },
  {
    title: 'Homebridge',
    url:
      'http://financingaccountconnect.com/Homebridge/LoanService/accounts/accountDetail/0',
    image: createPath('homebridge.jpg'),
  },
  { title: 'Hulu', url: 'http://www.hulu.com/', image: createPath('hulu.jpg') },
  { title: 'IMDB', url: 'http://www.imdb.com/', image: createPath('imdb.png') },
  { title: 'JWT', url: 'http://jwt.io/', image: createPath('jwt.svg') },
  {
    title: 'Jen Simmons Labs',
    url: 'http://labs.jensimmons.com/',
    image: createPath('jenlabs.png'),
  },
  {
    title: 'JustWatch',
    url: 'http://www.justwatch.com/us/provider/netflix',
    image: createPath('justwatch.png'),
  },
  {
    title: 'Kaiser Permanente',
    url:
      'http://healthy.kaiserpermanente.org/health/mycare/consumer/my-health-manager',
    image: createPath('kaiser.png'),
  },
  {
    title: "King's Harbor",
    url: 'http://kingsharbor.org/',
    image: createPath('khc.jpg'),
  },
  {
    title: 'LA Fitness',
    url: 'http://www.lafitness.com/Pages/billinghistory.aspx?scr=receipts',
    image: createPath('lafitness.png'),
  },
  {
    title: 'LinkedIn',
    url: 'http://www.linkedin.com/in/pgneely',
    image: createPath('linkedin.jpg'),
  },
  {
    title: 'Lloyds Bank',
    url: 'http://online.lloydsbank.co.uk/personal/logon/login.jsp',
    image: createPath('lloyds.jpg'),
  },
  {
    title: 'Logix',
    url: 'http://olb.logixbanking.com/User/MainAccounts/List',
    image: createPath('logix.png'),
  },
  {
    title: 'Meetup',
    url: 'http://www.meetup.com/find/',
    image: createPath('meetup.png'),
  },
  {
    title: 'Microsoft',
    url:
      'http://stores.office.com/myaccount/home.aspx?ui=en-US&rs=en-GB&ad=GB&s=1&auth=0&fromAR=3',
    image: createPath('microsoft.png'),
  },
  {
    title: 'Mint',
    url: 'http://wwws.mint.com/overview.event',
    image: createPath('mint.png'),
  },
  {
    title: 'MongoDB',
    url:
      'http://cloud.mongodb.com/v2/5b29a4710bd66b2c58f13b28#clusters?tooltip=nds.security&step=0',
    image: createPath('mongodb-atlas.png'),
  },
  {
    title: 'MyCarFax',
    url: 'http://www.mycarfax.com/',
    image: createPath('mycarfax.png'),
  },
  {
    title: 'Netflix DVD',
    url: 'http://dvd.netflix.com/MemberHome',
    image: createPath('netflixdvd.jpg'),
  },
  {
    title: 'Netflix',
    url: 'http://www.netflix.com/',
    image: createPath('netflix.png'),
  },
  {
    title: 'Node Compatibility',
    url: 'http://node.green/',
    image: createPath('nodegreen.png'),
  },
  {
    title: 'Our Groceries',
    url: 'http://www.ourgroceries.com/your-lists/list/IkFiAxpB0g3JdigiZj_U3q',
    image: createPath('ourgroceries.png'),
  },
  {
    title: 'Parallels Access',
    url: 'http://access.parallels.com/#/computers/',
    image: createPath('parallels.jpg'),
  },
  {
    title: 'ParkMe',
    url: 'http://www.parkme.com/los-angeles-parking',
    image: createPath('parkme.png'),
  },
  {
    title: 'PayPal',
    url: 'http://www.paypal.com/myaccount/home',
    image: createPath('paypal.png'),
  },
  {
    title: 'PlaneFinder',
    url: 'http://planefinder.net/',
    image: createPath('planefinder.png'),
  },
  {
    title: 'Plunkr',
    url: 'http://plnkr.co/edit/?p=catalogue',
    image: createPath('plunkr.png'),
  },
  {
    title: 'Pluralsight',
    url: 'http://www.pluralsight.com/',
    image: createPath('pluralsight.png'),
  },
  {
    title: 'Portainer',
    url: 'http://localhost:9000/#/containers/',
    image: createPath('portainer.png'),
  },
  {
    title: 'PowerSchool',
    url: 'http://torrance.powerschool.com/guardian/home.html',
    image: createPath('powerschool.png'),
  },
  {
    title: 'Providence',
    url: 'http://mychartor.providence.org/mychart/',
    image: createPath('providence.png'),
  },
  {
    title: 'Ray Wenderlich',
    url: 'http://www.raywenderlich.com/',
    image: createPath('raywenderlich.png'),
  },
  {
    title: 'React Style Guide: AirBnB',
    url: 'http://github.com/airbnb/javascript/tree/master/react#naming',
    image: createPath('react.png'),
  },
  {
    title: 'Regex 101',
    url: 'http://regex101.com/',
    image: createPath('regex101.jpg'),
  },
  {
    title: 'Regexr',
    url: 'http://www.regexr.com/',
    image: createPath('regexr.png'),
  },
  {
    title: 'Repl-it',
    url: 'http://repl.it/languages/javascript',
    image: createPath('replit.png'),
  },
  {
    title: 'SCE',
    url: 'http://www.sce.com/wps/myportal/home/mysce/myaccount',
    image: createPath('sce.jpg'),
  },
  {
    title: 'SVG Editor',
    url: 'http://petercollingridge.appspot.com/svg-editor',
    image: createPath('svg.png'),
  },
  {
    title: 'Seat Guru',
    url: 'http://www.seatguru.com/',
    image: createPath('seatguru.jpg'),
  },
  {
    title: 'Shazam',
    url: 'http://www.shazam.com/myshazam',
    image: createPath('shazam.png'),
  },
  {
    title: 'SoCalGas',
    url: 'http://myaccount.socalgas.com/myAccount/newscg.portal',
    image: createPath('socalgas.jpg'),
  },
  {
    title: 'Spectrum',
    url: 'http://www.spectrum.net/login/',
    image: createPath('spectrum.png'),
  },
  {
    title: 'Stackblitz',
    url: 'http://stackblitz.com/',
    image: createPath('stackblitz.png'),
  },
  {
    title: 'Synchrony',
    url:
      'http://consumercenter.mysynchrony.com/consumercenter/homeaction.do?strutsToken=tokenValue&tokenValue=90YB-29G9-Z06G-JIJV-3QGD-W61K-5L9D-648B-EMZQ-01IQ',
    image: createPath('synchrony.png'),
  },
  {
    title: 'Team Treehouse',
    url: 'http://teamtreehouse.com/library',
    image: createPath('treehouse.png'),
  },
  {
    title: 'Thinkster',
    url: 'http://thinkster.io/',
    image: createPath('thinkster.png'),
  },
  {
    title: 'Trello',
    url: 'http://trello.com/',
    image: createPath('trello.png'),
  },
  {
    title: 'TurboTax',
    url: 'http://myturbotax.intuit.com/inprogress/',
    image: createPath('turbotax.jpg'),
  },
  {
    title: 'TutsPlus',
    url: 'http://tutsplus.com/account/courses',
    image: createPath('tuts.png'),
  },
  {
    title: 'Uber',
    url: 'http://riders.uber.com/trips',
    image: createPath('uber.jpg'),
  },
  {
    title: 'Udemy',
    url: 'http://www.udemy.com/courses/',
    image: createPath('udemy.svg'),
  },
  {
    title: 'VSP',
    url: 'http://www.vsp.com/benefits-detail.html',
    image: createPath('vsp.JPG'),
  },
  {
    title: 'Venmo',
    url: 'http://venmo.com/peterneely',
    image: createPath('venmo.png'),
  },
  {
    title: 'W3 Schools',
    url: 'https://www.w3schools.com/colors/colors_mixer.asp',
    image: createPath('colors.gif'),
  },
  {
    title: 'Yelp',
    url: 'http://www.yelp.com/torrance-ca-us',
    image: createPath('yelp.jpeg'),
  },
  {
    title: 'YouTube',
    url: 'http://www.youtube.com/',
    image: createPath('youtube.svg'),
  },
  { title: 'eBay', url: 'http://www.ebay.com/', image: createPath('ebay.jpg') },
  {
    title: 'px to em',
    url: 'http://pxtoem.com/',
    image: createPath('pxtoem.png'),
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
