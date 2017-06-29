declare var chrome: Chrome;

interface Chrome {
    browsingData: BrowsingData
}

interface BrowsingData {
    remove(
        options: RemovalOptions,
        dataToRemove: DataTypeSet,
        callback: Function): void;
}

interface RemovalOptions {
    since?: number;
    originTypes?: any;
}

interface DataTypeSet {
    appcache?: boolean;
    cache?: boolean;
    localStorage?: boolean;
}
