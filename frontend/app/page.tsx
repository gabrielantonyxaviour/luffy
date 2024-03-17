import Image from "next/image";
import { Box, Container, Typography, Stack } from "@mui/material";
import { Hero, Section, PlayerCard, Sponsors } from "@/components";
import { players } from "@/data";

export default function Home() {
  return (
    <Box marginBottom={5}>
      <Hero />
      <Container maxWidth="xl">
        <Section title="How to play Luffy">
          <Stack direction="row" spacing={5}>
            <Box
              sx={{
                width: "50%",
                height: "400px",
                backgroundImage: `url('/champions.png')`,
                border: "1px solid #ffffff11",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: 2,
              }}
            ></Box>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: "24px" }} marginBottom={2}>
                How it works
              </Typography>
              <Typography sx={{ color: "#ffffffaa" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur tincidunt, nulla vel ornare ullamcorper, justo quam
                sodales turpis, eu scelerisque tortor erat at mi. Duis vitae
                lorem sodales, vulputate risus vitae, varius dui. Integer nec
                bibendum dui. Morbi non nulla nec nisl accumsan convallis. Morbi
                vehicula, nunc sed placerat molestie, quam ipsum maximus eros,
                ut tristique sapien neque ac dolor. Proin mattis facilisis
                lacus, eu fringilla nunc aliquet et. Vivamus sed nibh quam.
                Donec ac vestibulum ligula. Proin euismod, nisi porttitor
                aliquet varius, augue quam suscipit lectus, sed malesuada velit
                eros nec ligula.
              </Typography>
            </Box>
          </Stack>
        </Section>
        <Section title="Squad">
          <Stack direction="row" spacing={5} sx={{ overflowY: "scroll" }}>
            {players.map(({ id, name, position, nationality }) => (
              <PlayerCard
                key={id}
                name={name}
                position={position}
                nationality={nationality}
              />
            ))}
          </Stack>
        </Section>
        <Section title="Powered By">
          <Sponsors />
        </Section>
      </Container>
    </Box>
  );
}
