import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function BreadCrumbs({ id, links }) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="hover.blue"
      href={links.link}
      className="hover:text-blue-500"
    >
      {links.name}
    </Link>,
    <p className="text-blue-500">{id}</p>,
  ];

  console.log("id : ", id);

  return (
    <Stack spacing={2} className="mb-4">
      <Breadcrumbs
        separator={<MdOutlineNavigateNext size={20} />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
