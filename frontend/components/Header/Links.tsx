import NextLink from 'next/link';
import { Typography, Stack, Theme } from '@mui/material';

const styles = (theme: Theme) => ({
  fontSize: '20px',
  textDecoration: 'none',
  color: '#fff',
  '&:hover': {
    color: theme.palette.warning.main
  }
});

const nextLinkStyles = {
  fontSize: 'inherit',
  textDecoration: 'inherit',
  color: 'inherit'
};

const links = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/gameplay',
    text: 'Game Play'
  },
  {
    href: '/leaderboard',
    text: 'Leaderboard'
  },
  {
    href: '/playerlist',
    text: 'Player List'
  }
];

type LinkProps = {
  href: string;
  text: string;
  isActive: boolean;
};

const Link: React.FC<LinkProps> = ({ href, text, isActive }) => {
  return (
    <Typography
      component='span'
      sx={[
        (theme) => styles(theme),
        (theme) => (isActive ? { color: theme.palette.warning.main } : {})
      ]}
    >
      <NextLink href={href} style={nextLinkStyles}>
        {text}
      </NextLink>
    </Typography>
  );
};

type LinksProps = {
  pathname: string;
};

export const Links: React.FC<LinksProps> = ({ pathname }) => {
  return (
    <Stack direction='row' spacing={4}>
      {links.map(({ href, text }) => (
        <Link href={href} text={text} key={href} isActive={pathname === href} />
      ))}
    </Stack>
  );
};
