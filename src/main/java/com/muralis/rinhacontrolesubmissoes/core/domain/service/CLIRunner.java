package com.muralis.rinhacontrolesubmissoes.core.domain.service;

import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

@Log4j2
public class CLIRunner {

	private static final HashMap<String, String> commands = new HashMap<>();

	private static final int TIME_TO_WAIT_FILE = 1000 * 15; // 15 seconds

	private static final int TIME_TO_WAIT = 1000 * 60 * 5; // 5 minutes

	private static CLIRunner instance;

	public static CLIRunner getInstance() {
		if (instance == null) {
			instance = new CLIRunner();
		}
		return instance;
	}

	public static CLIRunner add(String command, String fileToWait) {
		commands.put(command, fileToWait);
		return getInstance();
	}

	public static void run() {
		commands.forEach((command, fileToWait) -> {
			try {
				log.info("Running command: " + command);
				Process exec = Runtime.getRuntime().exec(command);
				exec.waitFor();
				log.info("Command finished: " + command);
				if (fileToWait != null) {
					while (!Files.exists(Path.of(fileToWait))) {
						try {
							log.info("Waiting file: " + fileToWait);
							Thread.sleep(TIME_TO_WAIT_FILE);
						}
						catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
					log.info("File found: " + fileToWait);
				}
				else {
					log.info("Waiting " + TIME_TO_WAIT + "ms");
					Thread.sleep(TIME_TO_WAIT);
				}
			}
			catch (IOException | InterruptedException e) {
				throw new RuntimeException(e);
			}
		});
	}

}
