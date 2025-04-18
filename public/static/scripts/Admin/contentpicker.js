function configureDropDownLists(ddl1, ddl2) {
  var newsandupdates = ['Featured', 'Latest', 'Everything', 'Series', 'Columns'];
  var metaworldsinsider = ['Roblox', 'Hyperverse', 'Matrix World', 'Decentraland', 'Horizon World', 'Somnium Space', 'Nvidia Omniverse', 'The Sandbox', 'Second Life', 'Nifty Island', 'Meta Hero', 'Vault Hill', 'Rooom', 'Upland', 'Viverse', 'Earth2', 'Mona'];
  var metaverseresearch = ['Commercial', 'Open Public', 'Groups', 'Projects', 'Centers', 'Initiatives'];
  var startupsandbusiness = ['Featured', 'Recent', 'Series', 'Sponsored'];
  var educationprograms = ['Certification', 'Courses', 'Discussion Forums', 'Participations', 'Workshops'];
  var linkedtechnology = ['NFT', 'Web3', 'Blockchain', 'Cryptocurrency', 'Decentralization', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Virtual Reality', 'Mixed Reality', 'Distributed'];
  var digitaluniversities = ['University 1', 'University 2', 'University 3'];
  var researchlabs = ['Market Lab', 'Design Lab', 'Finance Lab', 'RealEstate Lab', 'Technology Lab', 'Sustainability Lab'];
  var memberships = ['Advisory Council', 'Columnist', 'Pro Bono', 'Researcher', 'Reviewer'];
  var marketplace = ['NFT', 'Apps', 'Crypto', 'Games', 'Events', 'Passes', 'Tickets', 'Business', 'Gift Cards', 'Resources', 'Real Estate', 'Packagings', 'Merchandise', 'Fin Products'];
  var people = ['Advisory Council', 'Columnists', 'Pro Bono', 'Researchers', 'Reviewers'];
  var events = ['Upcoming', 'Past', 'Satellite'];
  var videos = ['Featured', 'Everything', 'Series', 'Research'];
  var offers = ['Featured', 'Everything', 'Upcoming'];
  var podcasts = ['Featured', 'Everything', 'Upcoming', 'Satellite', 'Past'];
  var organizational = ['Partnerships', 'Opportunities', 'Support'];

  switch (ddl1.value) {
    case 'NewsandUpdates':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < newsandupdates.length; i++) {
        createOption(ddl2, newsandupdates[i], newsandupdates[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'MetaworldsInsider':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < metaworldsinsider.length; i++) {
        createOption(ddl2, metaworldsinsider[i], metaworldsinsider[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'MetaverseResearch':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < metaverseresearch.length; i++) {
        createOption(ddl2, metaverseresearch[i], metaverseresearch[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'StartupsandBusiness':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < startupsandbusiness.length; i++) {
        createOption(ddl2, startupsandbusiness[i], startupsandbusiness[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'EducationPrograms':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < educationprograms.length; i++) {
        createOption(ddl2, educationprograms[i], educationprograms[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'LinkedTechnology':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < linkedtechnology.length; i++) {
        createOption(ddl2, linkedtechnology[i], linkedtechnology[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'DigitalUniversities':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < digitaluniversities.length; i++) {
        createOption(ddl2, digitaluniversities[i], digitaluniversities[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'ResearchLabs':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < researchlabs.length; i++) {
        createOption(ddl2, researchlabs[i], researchlabs[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Memberships':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < memberships.length; i++) {
        createOption(ddl2, memberships[i], memberships[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Marketplace':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < marketplace.length; i++) {
        createOption(ddl2, marketplace[i], marketplace[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'People':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < people.length; i++) {
        createOption(ddl2, people[i], people[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Events':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < events.length; i++) {
        createOption(ddl2, events[i], events[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Videos':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < videos.length; i++) {
        createOption(ddl2, videos[i], videos[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Offers':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < offers.length; i++) {
        createOption(ddl2, offers[i], offers[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Podcasts':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < podcasts.length; i++) {
        createOption(ddl2, podcasts[i], podcasts[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Organizational':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < organizational.length; i++) {
        createOption(ddl2, organizational[i], organizational[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    default:
      ddl2.options.length = 0;
      break;
  }

}

function configureContentPathTagDropDownLists(ddl1, ddl2) {
  var external = ['Art', 'Business', 'Crypto', 'Economy', 'Entertainment', 'Fashion', 'Games', 'General', 'Health', 'Lifestyle', 'Magical', 'Music', 'RealEstate', 'Research', 'Social', 'Sponsored', 'Sports', 'Technology'];
  var metaverse = ['Roblox', 'Hyperverse', 'Matrix World', 'Decentraland', 'Horizon World', 'Somnium Space', 'Nvidia Omniverse', 'The Sandbox', 'Second Life', 'Nifty Island', 'Meta Hero', 'Vault Hill', 'Rooom', 'Upland', 'Viverse', 'Earth2', 'Mona'];

  switch (ddl1.value) {
    case 'External':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < external.length; i++) {
        createOption(ddl2, external[i], external[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'Metaverse':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < metaverse.length; i++) {
        createOption(ddl2, metaverse[i], metaverse[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    default:
      ddl2.options.length = 0;
      break;
  }

}

function configureLocationDropDownLists(ddl1, ddl2) {
  var onGlobe = ['Global', 'USA', 'Canada', 'Brazil', 'Argentina','Russia', 'Germany', 'France', 'Sweden', 'UAE', 'China', 'India', 'Japan', 'Australia', 'Singapore'];
  var inMetaverse = ['Roblox', 'Hyperverse', 'Matrix World', 'Decentraland', 'Horizon World', 'Somnium Space', 'Nvidia Omniverse', 'The Sandbox', 'Second Life', 'Nifty Island', 'Meta Hero', 'Vault Hill', 'Rooom', 'Upland', 'Viverse', 'Earth2', 'Mona'];

  switch (ddl1.value) {
    case 'InMetaverse':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < inMetaverse.length; i++) {
        createOption(ddl2, inMetaverse[i], inMetaverse[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    case 'OnGlobe':
      ddl2.options.length = 0;
      DefaultOption(ddl2);
      for (i = 0; i < onGlobe.length; i++) {
        createOption(ddl2, onGlobe[i], onGlobe[i]);
      }
      $('select#'+ddl2.id).formSelect();
      break;
    default:
      ddl2.options.length = 0;
      break;
  }

}

function DefaultOption(ddl)
{
  var opt = document.createElement('option');
  opt.value = 0;
  opt.text = 'Choose Option';
  opt.selected=true;
  opt.disabled=true;
  ddl.options.add(opt);
}

function createOption(ddl, text, value) {
  var opt = document.createElement('option');
  opt.value = value;
  opt.text = text;
  ddl.options.add(opt);
}