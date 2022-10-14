import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const homePage = props => (
  <h2>
    Welcome to Friendr, This will be the homepage before you sign into your
    account.
  </h2>
);

export default function Home() {
  return (
    <div>
      <h2>{homePage()}</h2>
    </div>
  );
}
