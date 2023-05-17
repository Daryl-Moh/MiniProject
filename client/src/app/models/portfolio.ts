import { PortfolioStocks } from "./portfoliostocks";

export interface Portfolio {
    userID: string;
    portfolioStocks: PortfolioStocks[];
}