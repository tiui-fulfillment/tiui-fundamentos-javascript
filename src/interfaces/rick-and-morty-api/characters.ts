export interface Characters {
  info:    Info;
  results: Result[];
}

interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

interface Result {
  id:       number;
  name:     string;
  status:   Status;
  species:  Species;
  type:     string;
  gender:   Gender;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}

enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

interface Location {
  name: string;
  url:  string;
}

enum Species {
  Alien = "Alien",
  Human = "Human",
}

enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
