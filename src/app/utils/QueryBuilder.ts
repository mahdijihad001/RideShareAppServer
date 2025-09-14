import { Query } from "mongoose";

class QueryBuilder<T> {
    public queryModel: Query<T[], T>;
    public query: Record<string, string>;

    constructor(queryModel: Query<T[], T>, query: Record<string, string>) {
        this.queryModel = queryModel;
        this.query = query
    };

}