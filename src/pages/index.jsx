import Head from "next/head";

import { BasicLayout } from "../components/BasicLayout";
import { LogoTitle } from "../components/LogoTitle";
import { ChooseGenerateMode } from "../components/ChooseGenerateMode";

export default function Home() {
	return (
		<BasicLayout>
			<Head>
				<title>Mockup Generator</title>
			</Head>

			<LogoTitle />

			<ChooseGenerateMode />
		</BasicLayout>
	);
}
