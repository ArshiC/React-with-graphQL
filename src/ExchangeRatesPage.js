import React from "react";
import { useQuery, gql } from "@apollo/client";

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Used graphQL and rest API endpoints using Apollo Client based on includeRate variable passed////////
//Used @include and #@rest directives/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

const EXCHANGE_RATES = gql`
  query GetExchangeRates($includeRate: Boolean!) {
    rates(currency: "AUD") @include(if: $includeRate) {
      currency
      rate
    }
    openExchangeRates @rest(type: "openExchangeRates", path: "/latest", endpoint: "openExchangeRate") {
      rates
    }
  }
`;

const includeRate = true;
function ExchangeRatePage() {
  const { data, loading, error } = useQuery(EXCHANGE_RATES, {variables: {includeRate}});

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if(includeRate) {
    return data.rates.map( rate => (
      <div key={rate.currency}>
        <p>
          {rate.currency}: {rate.rate}
        </p>
      </div>
    ));
  }else {
    const rates = data.openExchangeRates.rates;
    return Object.entries(rates).map(([key, value]) => (
      <div key={key}>
        <p>
          {key}: {value}
        </p>
      </div>
    ));
  }
}

export default ExchangeRatePage;