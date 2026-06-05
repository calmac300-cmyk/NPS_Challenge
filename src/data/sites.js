// Full NPS Challenge dataset — 396 sites, 460 total available points
// Format: { name, state, type, pts, cal, braden }
// pts: 2 = National Park, 1 = all other designations
// cal/braden: boolean — has this person visited?

export const TOTAL_AVAILABLE_POINTS = 460;

export const SITES = [
  // ALABAMA (7)
  { name: "Birmingham Civil Rights", state: "Alabama", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Freedom Riders", state: "Alabama", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Horseshoe Bend", state: "Alabama", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "Little River Canyon", state: "Alabama", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Russell Cave", state: "Alabama", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Tuskegee Airmen", state: "Alabama", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Tuskegee Institute", state: "Alabama", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // ALASKA (22)
  { name: "Alagnak Wild River", state: "Alaska", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Aniakchak", state: "Alaska", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Aniakchak Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Bering Land Bridge", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Cape Krusenstern", state: "Alaska", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Denali", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Denali Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Gates of the Arctic", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Gates of the Arctic Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Glacier Bay", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Glacier Bay Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Katmai", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Katmai Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Kenai Fjords", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Klondike Gold Rush", state: "Alaska", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Kobuk Valley", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Lake Clark", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Lake Clark Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Noatak", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Sitka", state: "Alaska", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Wrangell-St. Elias", state: "Alaska", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Wrangell-St. Elias Preserve", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Yukon-Charley Rivers", state: "Alaska", type: "National Preserve", pts: 1, cal: false, braden: false },

  // AMERICAN SAMOA (1)
  { name: "National Park of American Samoa", state: "American Samoa", type: "National Park", pts: 2, cal: false, braden: false },

  // ARIZONA (22)
  { name: "Canyon de Chelly", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Casa Grande Ruins", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Chiricahua", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Coronado", state: "Arizona", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Fort Bowie", state: "Arizona", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Grand Canyon", state: "Arizona", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Grand Canyon-Parashant", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Hohokam Pima", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Hubbell Trading Post", state: "Arizona", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Montezuma Castle", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Navajo", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Organ Pipe Cactus", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Petrified Forest", state: "Arizona", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Pipe Spring", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Saguaro", state: "Arizona", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Sunset Crater Volcano", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Tonto", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Tumacacori", state: "Arizona", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Tuzigoot", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Walnut Canyon", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Wupatki", state: "Arizona", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Lake Mead", state: "Arizona", type: "National Recreation Area", pts: 1, cal: false, braden: false },

  // ARKANSAS (7)
  { name: "Arkansas Post", state: "Arkansas", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Buffalo National River", state: "Arkansas", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Hot Springs", state: "Arkansas", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Little Rock Central High School", state: "Arkansas", type: "National Historic Site", pts: 1, cal: false, braden: true },
  { name: "Pea Ridge", state: "Arkansas", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "President Clinton Birthplace", state: "Arkansas", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Smith", state: "Arkansas", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // CALIFORNIA (26)
  { name: "Cabrillo", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Castle Mountains", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Cesar Chavez", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Channel Islands", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Devils Postpile", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Eugene O'Neill", state: "California", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Point", state: "California", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Golden Gate", state: "California", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "John Muir", state: "California", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Joshua Tree", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Kings Canyon", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Lassen Volcanic", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Lava Beds", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Manzanar", state: "California", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Mojave", state: "California", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Muir Woods", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Pinnacles", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Point Reyes", state: "California", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Port Chicago", state: "California", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Redwood", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Rosie the Riveter", state: "California", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "San Francisco Maritime", state: "California", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Santa Monica Mountains", state: "California", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Sequoia", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Tule Lake", state: "California", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Whiskeytown", state: "California", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Yosemite", state: "California", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Death Valley", state: "California", type: "National Park", pts: 2, cal: false, braden: false },

  // COLORADO (12)
  { name: "Amache", state: "Colorado", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Bent's Old Fort", state: "Colorado", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Black Canyon of the Gunnison", state: "Colorado", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Colorado Monument", state: "Colorado", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Curecanti", state: "Colorado", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Florissant Fossil Beds", state: "Colorado", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Great Sand Dunes", state: "Colorado", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Great Sand Dunes Preserve", state: "Colorado", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Hovenweep", state: "Colorado", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Mesa Verde", state: "Colorado", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Rocky Mountain", state: "Colorado", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Sand Creek Massacre", state: "Colorado", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Yucca House", state: "Colorado", type: "National Monument", pts: 1, cal: false, braden: false },

  // CONNECTICUT (2)
  { name: "Weir Farm", state: "Connecticut", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "New England Scenic Trail", state: "Connecticut", type: "National Historic Trails", pts: 1, cal: false, braden: false },

  // DELAWARE (1)
  { name: "First State", state: "Delaware", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // DISTRICT OF COLUMBIA (2)
  { name: "Belmont-Paul Women's Equality", state: "District of Columbia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Chesapeake and Ohio Canal", state: "District of Columbia", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // FLORIDA (11)
  { name: "Big Cypress", state: "Florida", type: "National Preserve", pts: 1, cal: false, braden: true },
  { name: "Biscayne", state: "Florida", type: "National Park", pts: 2, cal: true, braden: true },
  { name: "Canaveral", state: "Florida", type: "National Seashore", pts: 1, cal: true, braden: false },
  { name: "Castillo de San Marcos", state: "Florida", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "De Soto", state: "Florida", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Dry Tortugas", state: "Florida", type: "National Park", pts: 2, cal: true, braden: false },
  { name: "Everglades", state: "Florida", type: "National Park", pts: 2, cal: true, braden: true },
  { name: "Fort Caroline", state: "Florida", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Fort Matanzas", state: "Florida", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Gulf Islands", state: "Florida", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Timucuan", state: "Florida", type: "National Preserve", pts: 1, cal: false, braden: false },

  // GEORGIA (10)
  { name: "Andersonville", state: "Georgia", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Chattahoochee River", state: "Georgia", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Chickamauga and Chattanooga", state: "Georgia", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "Cumberland Island", state: "Georgia", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Fort Frederica", state: "Georgia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Fort Pulaski", state: "Georgia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Jimmy Carter", state: "Georgia", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Kennesaw Mountain", state: "Georgia", type: "National Battlefield Park", pts: 1, cal: false, braden: false },
  { name: "Martin Luther King Jr.", state: "Georgia", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Ocmulgee Mounds", state: "Georgia", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // GUAM (1)
  { name: "War in the Pacific", state: "Guam", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // HAWAII (8)
  { name: "Haleakala", state: "Hawaii", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Hawaii Volcanoes", state: "Hawaii", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Honouliuli", state: "Hawaii", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Kalaupapa", state: "Hawaii", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Kaloko-Honokohau", state: "Hawaii", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Pearl Harbor", state: "Hawaii", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Puuhonua o Honaunau", state: "Hawaii", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Puukohola Heiau", state: "Hawaii", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // IDAHO (7)
  { name: "City of Rocks", state: "Idaho", type: "National Reserve", pts: 1, cal: false, braden: false },
  { name: "Craters of the Moon", state: "Idaho", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Craters of the Moon Preserve", state: "Idaho", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Hagerman Fossil Beds", state: "Idaho", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Minidoka", state: "Idaho", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Nez Perce", state: "Idaho", type: "National Historical Park", pts: 1, cal: false, braden: false },
  // ILLINOIS (6)
  { name: "Chicago Portage", state: "Illinois", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Emmett Till", state: "Illinois", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Lincoln Home", state: "Illinois", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "New Philadelphia", state: "Illinois", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Pullman", state: "Illinois", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Springfield Race Riot", state: "Illinois", type: "National Monument", pts: 1, cal: false, braden: false },

  // INDIANA (3)
  { name: "George Rogers Clark", state: "Indiana", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Indiana Dunes", state: "Indiana", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Lincoln Boyhood", state: "Indiana", type: "National Memorial", pts: 1, cal: false, braden: false },

  // IOWA (2)
  { name: "Effigy Mounds", state: "Iowa", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Herbert Hoover", state: "Iowa", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // KANSAS (5)
  { name: "Brown v. Board of Education", state: "Kansas", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Fort Larned", state: "Kansas", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Scott", state: "Kansas", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Nicodemus", state: "Kansas", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Tallgrass Prairie", state: "Kansas", type: "National Preserve", pts: 1, cal: false, braden: false },

  // KENTUCKY (6)
  { name: "Abraham Lincoln Birthplace", state: "Kentucky", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Big South Fork", state: "Kentucky", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Camp Nelson", state: "Kentucky", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Cumberland Gap", state: "Kentucky", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Mammoth Cave", state: "Kentucky", type: "National Park", pts: 2, cal: true, braden: false },
  { name: "Mill Springs Battlefield", state: "Kentucky", type: "National Monument", pts: 1, cal: false, braden: false },

  // LOUISIANA (4)
  { name: "Cane River Creole", state: "Louisiana", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Jean Lafitte", state: "Louisiana", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "New Orleans Jazz", state: "Louisiana", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Poverty Point", state: "Louisiana", type: "National Monument", pts: 1, cal: false, braden: false },

  // MAINE (4)
  { name: "Acadia", state: "Maine", type: "National Park", pts: 2, cal: true, braden: true },
  { name: "Appalachian Trail", state: "Maine", type: "National Historic Trails", pts: 1, cal: true, braden: true },
  { name: "Frances Perkins", state: "Maine", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Katahdin Woods and Waters", state: "Maine", type: "National Monument", pts: 1, cal: false, braden: false },

  // MARYLAND (8)
  { name: "Antietam", state: "Maryland", type: "National Battlefield", pts: 1, cal: true, braden: true },
  { name: "Assateague Island", state: "Maryland", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Clara Barton", state: "Maryland", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort McHenry", state: "Maryland", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Hampton", state: "Maryland", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Harriet Tubman Underground Railroad", state: "Maryland", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Monocacy", state: "Maryland", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Thomas Stone", state: "Maryland", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // MASSACHUSETTS (14)
  { name: "Adams", state: "Massachusetts", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "Boston", state: "Massachusetts", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "Boston African American", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: true, braden: false },
  { name: "Boston Harbor Islands", state: "Massachusetts", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Cape Cod", state: "Massachusetts", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Frederick Law Olmsted", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "John Fitzgerald Kennedy", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Longfellow House", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Lowell", state: "Massachusetts", type: "National Historical Park", pts: 1, cal: true, braden: false },
  { name: "Minute Man", state: "Massachusetts", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "New Bedford Whaling", state: "Massachusetts", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Salem Maritime", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Saugus Iron Works", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: true, braden: false },
  { name: "Springfield Armory", state: "Massachusetts", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // MICHIGAN (6)
  { name: "Father Marquette", state: "Michigan", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Isle Royale", state: "Michigan", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Keweenaw", state: "Michigan", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Pictured Rocks", state: "Michigan", type: "National Lakeshore", pts: 1, cal: false, braden: false },
  { name: "River Raisin", state: "Michigan", type: "National Battlefield Park", pts: 1, cal: false, braden: false },
  { name: "Sleeping Bear Dunes", state: "Michigan", type: "National Lakeshore", pts: 1, cal: false, braden: false },

  // MINNESOTA (4)
  { name: "Grand Portage", state: "Minnesota", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Mississippi River", state: "Minnesota", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Pipestone", state: "Minnesota", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Voyageurs", state: "Minnesota", type: "National Park", pts: 2, cal: false, braden: false },

  // MISSISSIPPI (6)
  { name: "Brices Cross Roads", state: "Mississippi", type: "National Battlefield Site", pts: 1, cal: false, braden: false },
  { name: "Medgar Evers Home", state: "Mississippi", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Natchez", state: "Mississippi", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Natchez Trace Trail", state: "Mississippi", type: "National Historic Trails", pts: 1, cal: false, braden: false },
  { name: "Tupelo", state: "Mississippi", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Vicksburg", state: "Mississippi", type: "National Military Park", pts: 1, cal: false, braden: false },

  // MISSOURI (7)
  { name: "Gateway Arch", state: "Missouri", type: "National Park", pts: 2, cal: true, braden: true },
  { name: "George Washington Carver", state: "Missouri", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Harry S Truman", state: "Missouri", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Ozark Riverways", state: "Missouri", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Ste. Genevieve", state: "Missouri", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Ulysses S. Grant", state: "Missouri", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Wilson's Creek", state: "Missouri", type: "National Battlefield", pts: 1, cal: false, braden: false },

  // MONTANA (6)
  { name: "Big Hole", state: "Montana", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Bighorn Canyon", state: "Montana", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Glacier", state: "Montana", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Grant-Kohrs Ranch", state: "Montana", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Union Trading Post", state: "Montana", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Little Bighorn Battlefield", state: "Montana", type: "National Monument", pts: 1, cal: false, braden: true },

  // NEBRASKA (6)
  { name: "Agate Fossil Beds", state: "Nebraska", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Chimney Rock", state: "Nebraska", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Homestead", state: "Nebraska", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Missouri Recreational River", state: "Nebraska", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Niobrara", state: "Nebraska", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Scotts Bluff", state: "Nebraska", type: "National Monument", pts: 1, cal: false, braden: false },

  // NEVADA (4)
  { name: "Avi Kwa Ame", state: "Nevada", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Great Basin", state: "Nevada", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Tule Springs Fossil Beds", state: "Nevada", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Lake Mead Nevada", state: "Nevada", type: "National Recreation Area", pts: 1, cal: false, braden: false },

  // NEW HAMPSHIRE (1)
  { name: "Saint-Gaudens", state: "New Hampshire", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // NEW JERSEY (7)
  { name: "Delaware Water Gap", state: "New Jersey", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Gateway", state: "New Jersey", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Great Egg Harbor", state: "New Jersey", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Middle Delaware", state: "New Jersey", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Morristown", state: "New Jersey", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Paterson Great Falls", state: "New Jersey", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Thomas Edison", state: "New Jersey", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // NEW MEXICO (15)
  { name: "Aztec Ruins", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Bandelier", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Capulin Volcano", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Carlsbad Caverns", state: "New Mexico", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Chaco Culture", state: "New Mexico", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "El Malpais", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "El Morro", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Fort Union NM", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Gila Cliff Dwellings", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Manhattan Project", state: "New Mexico", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Pecos", state: "New Mexico", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Petroglyph", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Salinas Pueblo Missions", state: "New Mexico", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Valles Caldera", state: "New Mexico", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "White Sands", state: "New Mexico", type: "National Park", pts: 2, cal: false, braden: true },

  // NEW YORK (22)
  { name: "African Burial Ground", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Castle Clinton", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Eleanor Roosevelt", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Federal Hall", state: "New York", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Fire Island", state: "New York", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Fort Stanwix", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "General Grant", state: "New York", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Governors Island", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Hamilton Grange", state: "New York", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Harriet Tubman NHP", state: "New York", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Home of FDR", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Martin Van Buren", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Sagamore Hill", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Saratoga", state: "New York", type: "National Historical Park", pts: 1, cal: true, braden: false },
  { name: "Statue of Liberty", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Stonewall", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Theodore Roosevelt Birthplace", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Theodore Roosevelt Inaugural", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Upper Delaware River", state: "New York", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Vanderbilt Mansion", state: "New York", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Women's Rights", state: "New York", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Statue of Liberty NJ side", state: "New York", type: "National Monument", pts: 1, cal: false, braden: false },

  // NORTH CAROLINA (8)
  { name: "Cape Hatteras", state: "North Carolina", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Cape Lookout", state: "North Carolina", type: "National Seashore", pts: 1, cal: false, braden: false },
  { name: "Carl Sandburg Home", state: "North Carolina", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Raleigh", state: "North Carolina", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Great Smoky Mountains", state: "North Carolina", type: "National Park", pts: 2, cal: true, braden: true },
  { name: "Guilford Courthouse", state: "North Carolina", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "Moores Creek", state: "North Carolina", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Wright Brothers", state: "North Carolina", type: "National Memorial", pts: 1, cal: false, braden: false },

  // NORTH DAKOTA (2)
  { name: "Knife River", state: "North Dakota", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Theodore Roosevelt NP", state: "North Dakota", type: "National Park", pts: 2, cal: false, braden: false },

  // NORTHERN MARIANA ISLANDS (1)
  { name: "American Memorial Park", state: "Northern Mariana Islands", type: "National Memorial", pts: 1, cal: false, braden: false },

  // OHIO (7)
  { name: "Charles Young", state: "Ohio", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Cuyahoga Valley", state: "Ohio", type: "National Park", pts: 2, cal: true, braden: false },
  { name: "Dayton Aviation", state: "Ohio", type: "National Historical Park", pts: 1, cal: true, braden: false },
  { name: "First Ladies", state: "Ohio", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Hopewell Culture", state: "Ohio", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "James A. Garfield", state: "Ohio", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Perry's Victory", state: "Ohio", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "William Howard Taft", state: "Ohio", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // OKLAHOMA (3)
  { name: "Chickasaw", state: "Oklahoma", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Oklahoma City", state: "Oklahoma", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Washita Battlefield", state: "Oklahoma", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // OREGON (4)
  { name: "Crater Lake", state: "Oregon", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "John Day Fossil Beds", state: "Oregon", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Lewis and Clark", state: "Oregon", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Oregon Caves", state: "Oregon", type: "National Monument", pts: 1, cal: false, braden: false },

  // PENNSYLVANIA (14)
  { name: "Allegheny Portage Railroad", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Carlisle Boarding School", state: "Pennsylvania", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Edgar Allan Poe", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Eisenhower", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Flight 93", state: "Pennsylvania", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Fort Necessity", state: "Pennsylvania", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Friendship Hill", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Gettysburg", state: "Pennsylvania", type: "National Military Park", pts: 1, cal: true, braden: true },
  { name: "Hopewell Furnace", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Independence", state: "Pennsylvania", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Johnstown Flood", state: "Pennsylvania", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Steamtown", state: "Pennsylvania", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Thaddeus Kosciuszko", state: "Pennsylvania", type: "National Memorial", pts: 1, cal: false, braden: false },
  { name: "Valley Forge", state: "Pennsylvania", type: "National Historical Park", pts: 1, cal: true, braden: false },

  // PUERTO RICO (1)
  { name: "San Juan", state: "Puerto Rico", type: "National Historic Site", pts: 1, cal: false, braden: true },

  // RHODE ISLAND (2)
  { name: "Blackstone River Valley", state: "Rhode Island", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Roger Williams", state: "Rhode Island", type: "National Memorial", pts: 1, cal: false, braden: false },

  // SOUTH CAROLINA (7)
  { name: "Charles Pinckney", state: "South Carolina", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Congaree", state: "South Carolina", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Cowpens", state: "South Carolina", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Fort Sumter", state: "South Carolina", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Kings Mountain", state: "South Carolina", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "Ninety Six", state: "South Carolina", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Reconstruction Era", state: "South Carolina", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // SOUTH DAKOTA (5)
  { name: "Badlands", state: "South Dakota", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Jewel Cave", state: "South Dakota", type: "National Monument", pts: 1, cal: false, braden: true },
  { name: "Minuteman Missile", state: "South Dakota", type: "National Historic Site", pts: 1, cal: false, braden: true },
  { name: "Mount Rushmore", state: "South Dakota", type: "National Memorial", pts: 1, cal: false, braden: true },
  { name: "Wind Cave", state: "South Dakota", type: "National Park", pts: 2, cal: false, braden: true },

  // TENNESSEE (4)
  { name: "Andrew Johnson", state: "Tennessee", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Fort Donelson", state: "Tennessee", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Shiloh", state: "Tennessee", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "Stones River", state: "Tennessee", type: "National Battlefield", pts: 1, cal: false, braden: false },

  // TEXAS (14)
  { name: "Alibates Flint", state: "Texas", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Amistad", state: "Texas", type: "National Recreation Area", pts: 1, cal: false, braden: true },
  { name: "Big Bend", state: "Texas", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Big Thicket", state: "Texas", type: "National Preserve", pts: 1, cal: false, braden: false },
  { name: "Blackwell School", state: "Texas", type: "National Historic Site", pts: 1, cal: false, braden: true },
  { name: "Chamizal", state: "Texas", type: "National Memorial", pts: 1, cal: false, braden: true },
  { name: "Fort Davis", state: "Texas", type: "National Historic Site", pts: 1, cal: false, braden: true },
  { name: "Guadalupe Mountains", state: "Texas", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Lake Meredith", state: "Texas", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Lyndon B. Johnson", state: "Texas", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "Padre Island", state: "Texas", type: "National Seashore", pts: 1, cal: false, braden: true },
  { name: "Palo Alto Battlefield", state: "Texas", type: "National Historical Park", pts: 1, cal: false, braden: true },
  { name: "Rio Grande", state: "Texas", type: "National Scenic River", pts: 1, cal: false, braden: true },
  { name: "San Antonio Missions", state: "Texas", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "Waco Mammoth", state: "Texas", type: "National Monument", pts: 1, cal: false, braden: false },

  // U.S. VIRGIN ISLANDS (5)
  { name: "Buck Island Reef", state: "U.S. Virgin Islands", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Christiansted", state: "U.S. Virgin Islands", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Salt River Bay", state: "U.S. Virgin Islands", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Virgin Islands", state: "U.S. Virgin Islands", type: "National Park", pts: 2, cal: false, braden: true },
  { name: "Virgin Islands Coral Reef", state: "U.S. Virgin Islands", type: "National Monument", pts: 1, cal: false, braden: false },

  // UTAH (12)
  { name: "Arches", state: "Utah", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Bryce Canyon", state: "Utah", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Canyonlands", state: "Utah", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Capitol Reef", state: "Utah", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Cedar Breaks", state: "Utah", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Dinosaur", state: "Utah", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Glen Canyon", state: "Utah", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Golden Spike", state: "Utah", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Natural Bridges", state: "Utah", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Rainbow Bridge", state: "Utah", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Timpanogos Cave", state: "Utah", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Zion", state: "Utah", type: "National Park", pts: 2, cal: false, braden: false },

  // VERMONT (1)
  { name: "Marsh-Billings-Rockefeller", state: "Vermont", type: "National Historical Park", pts: 1, cal: false, braden: false },

  // VIRGINIA (12)
  { name: "Appomattox Court House", state: "Virginia", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "Arlington House", state: "Virginia", type: "National Memorial", pts: 1, cal: true, braden: true },
  { name: "Booker T. Washington", state: "Virginia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Cedar Creek and Belle Grove", state: "Virginia", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Colonial NHP", state: "Virginia", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Fort Monroe", state: "Virginia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Fredericksburg and Spotsylvania", state: "Virginia", type: "National Military Park", pts: 1, cal: false, braden: false },
  { name: "George Washington Birthplace", state: "Virginia", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Maggie L. Walker", state: "Virginia", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Manassas", state: "Virginia", type: "National Battlefield Park", pts: 1, cal: true, braden: true },
  { name: "Petersburg", state: "Virginia", type: "National Battlefield", pts: 1, cal: false, braden: false },
  { name: "Shenandoah", state: "Virginia", type: "National Park", pts: 2, cal: true, braden: true },

  // WASHINGTON (9)
  { name: "Ebey's Landing", state: "Washington", type: "National Reserve", pts: 1, cal: false, braden: false },
  { name: "Fort Vancouver", state: "Washington", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Lake Chelan", state: "Washington", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Lake Roosevelt", state: "Washington", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Mount Rainier", state: "Washington", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "North Cascades", state: "Washington", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "Olympic", state: "Washington", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "San Juan Island", state: "Washington", type: "National Historical Park", pts: 1, cal: false, braden: false },
  { name: "Whitman Mission", state: "Washington", type: "National Historic Site", pts: 1, cal: false, braden: false },

  // WEST VIRGINIA (4)
  { name: "Bluestone", state: "West Virginia", type: "National Scenic River", pts: 1, cal: false, braden: false },
  { name: "Gauley River", state: "West Virginia", type: "National Recreation Area", pts: 1, cal: false, braden: false },
  { name: "Harpers Ferry", state: "West Virginia", type: "National Historical Park", pts: 1, cal: true, braden: true },
  { name: "New River Gorge", state: "West Virginia", type: "National Park", pts: 2, cal: true, braden: false },
  { name: "New River Gorge Preserve", state: "West Virginia", type: "National Preserve", pts: 1, cal: false, braden: false },

  // WISCONSIN (3)
  { name: "Apostle Islands", state: "Wisconsin", type: "National Lakeshore", pts: 1, cal: false, braden: false },
  { name: "Ice Age Trail", state: "Wisconsin", type: "National Historic Trails", pts: 1, cal: true, braden: true },
  { name: "Saint Croix", state: "Wisconsin", type: "National Scenic River", pts: 1, cal: false, braden: false },

  // WYOMING (6)
  { name: "Devils Tower", state: "Wyoming", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Fossil Butte", state: "Wyoming", type: "National Monument", pts: 1, cal: false, braden: false },
  { name: "Fort Laramie", state: "Wyoming", type: "National Historic Site", pts: 1, cal: false, braden: false },
  { name: "Grand Teton", state: "Wyoming", type: "National Park", pts: 2, cal: false, braden: false },
  { name: "John D. Rockefeller Jr. Parkway", state: "Wyoming", type: "National Parkway", pts: 1, cal: false, braden: false },
  { name: "Yellowstone", state: "Wyoming", type: "National Park", pts: 2, cal: false, braden: true },
];
