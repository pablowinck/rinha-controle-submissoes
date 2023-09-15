package com.muralis.rinhacontrolesubmissoes.core.domain.service;

import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;

@Log4j2
public class CLIRunner {

	private static final List<String> commands = new ArrayList<>();

	private static CLIRunner instance;

	public static CLIRunner getInstance() {
		if (instance == null) {
			instance = new CLIRunner();
		}
		return instance;
	}

	public static CLIRunner add(String command) {
		commands.add(command);
		return getInstance();
	}

	public static void run() {
		commands.forEach(command -> {
			try {
				log.info("Running command: {}", command);
				String[] rawCommand = new String[]{"/bin/bash", "-c", command};
				Process process = Runtime.getRuntime().exec(rawCommand);
				byte[] buffer = new byte[8192];
				int read;
				while ((read = process.getInputStream().read(buffer, 0, 8192)) >= 0) {
					log.info("{}", new String(buffer, 0, read));
				}
				process.waitFor();
				log.info("Command {} executed", command);
			}
			catch (Exception exception) {
				log.error("Error running command {}", command, exception);
			}
		});
		commands.clear();
	}

}
