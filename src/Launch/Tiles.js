import React from "react";
import { Tile } from "./Tile";
import { links } from "./links";
import './launch.scss';

export const Tiles = () => {
  return (
    <main className="tiles">
      {links.map(({ icon, link, name }, index) => (
        <Tile icon={icon} key={index} link={link} name={name} />
      ))}
    </main>
  );
};
