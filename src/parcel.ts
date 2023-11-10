export enum ParcelType {
    GADGETS = 'gadgets',
    DRINKS = 'drinks',
    CLOTHES = 'clothes',
    MEDICINES = 'medicines',
    OTHER = 'other'
}

export interface Parcel {
    cityFrom: string,
    cityTo: string,
    parcelType: ParcelType,
    dispatchDate: string,
    parcelDescription?: string
}

export interface City {
    place_name: String
}

export const mapBoxAPI = 'pk.eyJ1IjoidmxhZGxldXMiLCJhIjoiY2xlcHlub2JlMGhjNTQxbzE0YXhuOHdkdyJ9.WUS5fJZICvhdsI1yTn16kQ';
// I know u don't have to store ue APIs like this,
// but since we don't have a backend, and u gonna need this for one feature.
