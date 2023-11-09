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
    dispatchDate: Date,
    parcelDescription?: string
}

export const myParcelsJson: any = localStorage.getItem('myParcels');
export const myParcels: Parcel[] = JSON.parse(myParcelsJson) ?? [];
