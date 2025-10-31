export interface IGeoJson {
    type: string;
    features: IFeature[];
}

interface IFeature {
    type: string;
    properties: IProperties;
    geometry: IGeometry;
}

export interface IProperties {
    name: string
    acroutes?: string[]
    adcode: number
    center: number[]
    centroid?: number[]
    childrenNum?: number
    level: string
    parent?: { adcode: number }
    subFeatureIndex?: number
}

interface IGeometry {
    type: string;
    coordinates: number[][][];
}