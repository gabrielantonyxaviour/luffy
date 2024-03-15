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
    href: '#home',
    text: 'Home'
  },
  {
    href: '#gameplay',
    text: 'Game Play'
  },
  {
    href: '#squad',
    text: 'Squad'
  },
  {
    href: '#leaderboard',
    text: 'Leaderboard'
  },
  {
    href: '#playerlist',
    text: 'Player List'
  }
];

type LinkProps = {
  href: string;
  text: string;
};

const Link: React.FC<LinkProps> = ({ href, text }) => {
  return (
    <Typography component='span' sx={(theme) => styles(theme)}>
      <NextLink href={href} style={nextLinkStyles}>
        {text}
      </NextLink>
    </Typography>
  );
};

export const Links = () => {
  return (
    <Stack direction='row' spacing={4}>
      {links.map(({ href, text }) => (
        <Link href={href} text={text} key={href} />
      ))}
    </Stack>
  );
};
