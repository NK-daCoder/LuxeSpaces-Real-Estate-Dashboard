import { SalesDashboardPaths } from "./paths.js"

const SalesDashboard = {
    title: 'Sales Dashboard',
    primaryLinks: [
        {iconOne:"fi fi-rr-home", iconTwo:"fi fi-sr-home" ,label: 'Home', to: SalesDashboardPaths.Home},
        {iconOne:"fi fi-rr-users", iconTwo:"fi fi-sr-users" ,label: 'Clients', to: SalesDashboardPaths.Clients},
        {iconOne:"fi fi-rr-building", iconTwo:"fi fi-sr-building" ,label: 'Properties', to: SalesDashboardPaths.Properties},
        {iconOne:"fi fi-rr-chart-pie-alt", iconTwo:"fi fi-sr-chart-pie-alt" ,label: 'Reports', to: SalesDashboardPaths.Reports},
        // leads and inquiries
        {iconOne:"fi fi-rr-phone-rotary", iconTwo:"fi fi-sr-phone-rotary" ,label: 'Inquiries And Leads', to: SalesDashboardPaths.Inquiry},
    ],
    secondayLinks: [
        {iconOne:"fi fi-rr-settings", iconTwo:"fi fi-sr-settings" ,label: 'Settings', to: SalesDashboardPaths.Settings},
        {iconOne:"fi fi-rr-interrogation", iconTwo:"fi fi-sr-interrogation" ,label: 'Help', to: SalesDashboardPaths.HelpDesk},
    ],
    headerLinks: [
        {iconOne:"fi fi-rr-bell", iconTwo:"fi fi-sr-bell" ,label: 'Notifications', to: SalesDashboardPaths.Notification},
        {iconOne:"fi fi-rr-comments", iconTwo:"fi fi-sr-comments" ,label: 'Messages', to: SalesDashboardPaths.Messages},
        {iconOne:"fi fi-rr-user", iconTwo:"fi fi-sr-user" ,label: 'Profile', to: SalesDashboardPaths.Profile},
    ],
}

export { SalesDashboard } 