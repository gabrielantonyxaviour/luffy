"use client";

import Image from "next/image";
import { Box, Typography, Theme } from "@mui/material";

const styles = (theme: Theme) => ({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
  },
  infoBadge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    paddingRight: 1,
  },
  infoBadgePoints: {
    backgroundColor: theme.palette.background.default,
    paddingX: 1,
    paddingY: 0.5,
  },
  infoBadgeName: {
    paddingX: 1,
    paddingY: 0.5,
    color: "#000",
    fontWeight: 500,
  },
});

const InfoBadge = ({
  name,
  nationality,
  isUnknown = true,
  point,
}: {
  name: string;
  nationality: string;
  isUnknown?: boolean;
  point: string;
}) => {
  return (
    <Box sx={(theme) => styles(theme).infoBadge}>
      <Typography sx={(theme) => styles(theme).infoBadgePoints} noWrap>
        {point} pt
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => styles(theme).infoBadgeName}
        noWrap
      >
        {!isUnknown ? name.split(" ").splice(-1).join(" ") : "Select"}
      </Typography>
      {!isUnknown && (
        <Image
          src={`/flags/${nationality}.png`}
          alt={`flag_${nationality}`}
          width={20}
          height={20}
        />
      )}
    </Box>
  );
};

type PlayerProps = {
  x: string | number;
  y: string | number;
  name: string;
  nationality: string;
  isUnknown?: boolean;
  point: string;
};

export const Player: React.FC<PlayerProps> = ({
  x,
  y,
  name,
  nationality,
  isUnknown = true,
  point,
}) => {
  const imageSrc = isUnknown
    ? "/teams/avatar.png"
    : `/teams/${nationality.toLowerCase()}.png`;
  const imageAlt = isUnknown ? "player_unknown" : `player_${nationality}`;

  return (
    <Box sx={[(theme) => styles(theme).container, { top: y, left: x }]}>
      <Image src={imageSrc} alt={imageAlt} width={50} height={70} />
      <InfoBadge
        name={name}
        nationality={nationality.toLowerCase()}
        isUnknown={isUnknown}
        point={point}
      />
    </Box>
  );
};
