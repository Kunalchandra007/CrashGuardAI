export type DelhiAccidentPoint = {
  id: string;
  area: string;
  accidents: number;
  latitude: number;
  longitude: number;
};

export const delhiAccidentData: DelhiAccidentPoint[] = [
  {
    id: "azadpur-sabzi-mandi",
    area: "Azadpur Sabzi Mandi",
    accidents: 11,
    latitude: 28.7064,
    longitude: 77.181,
  },
  {
    id: "wazirabad",
    area: "Wazirabad",
    accidents: 9,
    latitude: 28.7174,
    longitude: 77.221,
  },
  {
    id: "akshardham-temple",
    area: "Akshardham Temple",
    accidents: 8,
    latitude: 28.6127,
    longitude: 77.2773,
  },
  {
    id: "sgt-nagar",
    area: "SGT Nagar",
    accidents: 7,
    latitude: 28.6958,
    longitude: 77.2143,
  },
  {
    id: "rajokri-flyover",
    area: "Rajokri Flyover",
    accidents: 7,
    latitude: 28.5228,
    longitude: 77.1236,
  },
  {
    id: "yashobhoomi",
    area: "Yashobhoomi Convention Centre",
    accidents: 7,
    latitude: 28.5562,
    longitude: 77.0632,
  },
  {
    id: "libaspur-bus-stand",
    area: "Libaspur Bus Stand",
    accidents: 6,
    latitude: 28.7505,
    longitude: 77.1162,
  },
  {
    id: "isbt-kashmere-gate",
    area: "ISBT Kashmere Gate",
    accidents: 6,
    latitude: 28.6679,
    longitude: 77.2285,
  },
];
