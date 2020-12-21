
export default class AppCache {
    constructor(props) {
        this.props = props
        this.cache = {
            reports: null,
        }
    }
    
    cacheReports(value) {
        this.cache.reports = value
    }
    
    reports() {
        return this.cache.reports
    }
}