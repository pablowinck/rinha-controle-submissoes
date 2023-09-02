package com.muralis.rinhacontrolesubmissoes.core.domain.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;

@RequiredArgsConstructor
public class LocalMultipartFile implements MultipartFile {

	private final URL url;

	@Override
	public String getName() {
		return url.getFile();
	}

	@Override
	public String getOriginalFilename() {
		return url.getFile();
	}

	@Override
	public String getContentType() {
		return "application/yml";
	}

	@Override
	public boolean isEmpty() {
		return false;
	}

	@Override
	public long getSize() {
		return new File(url.getFile()).length();
	}

	@Override
	public byte[] getBytes() {
		return new File(url.getFile()).toString().getBytes();
	}

	@Override
	public InputStream getInputStream() throws IOException {
		return new FileInputStream(url.getFile());
	}

	@Override
	public void transferTo(File dest) throws IOException, IllegalStateException {
		FileInputStream fileInputStream = new FileInputStream(url.getFile());
		FileOutputStream fileOutputStream = new FileOutputStream(dest);
		fileInputStream.transferTo(fileOutputStream);
		fileInputStream.close();
	}

}
