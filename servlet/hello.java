import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class hello extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public hello() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	/*
	 * ��Get��ʽ����ҳ��ʱִ�иú��� ִ��doGetǰ����ִ��getLastModified,������������getLastModified������ֵ
	 * ���ϴη��ʷ�����ֵ��ͬ������Ϊ���ĵ�û�и��£������ִ�л������ִ��doGet �������-1����Ϊ��ʵʱ���µģ�����ִ�иú���
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.log("ִ�� doGet ����...");
		this.execute(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred ִ��ǰ����ִ��getLastModified
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.log("ִ�� doPost ����...");
		this.execute(request, response);
	}

	/**
	 * ���ظ�Servlet�����ĵ��ĸ���ʱ�䡣��Get������Ч ���ص�ʱ��Ϊ�����1970��1��1��08:00:00�ĺ�����
	 * �������-1��ʾʵʱ���¡�Ĭ��Ϊ-1
	 */
	@Override
	public long getLastModified(HttpServletRequest request) {
		this.log("ִ�� getLastModified ����...");
		return -1;
	}

	// ִ�з���
	private void execute(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setCharacterEncoding("UTF-8");// ����request��response���룬������Ҫע��
		request.setCharacterEncoding("UTF-8");
		String requestURI = request.getRequestURI();// ����Servlet��URI
		String method = request.getMethod();// ����Servlet�ķ�ʽGet��Post
		String param = request.getParameter("param");// �ͻ����ύ�Ĳ���paramֵ

		response.setContentType("text/html");// �����ĵ�����ΪHTML����
		PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">");
		out.println("<HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println(" <BODY>");
		out.println("	��" + method + " ��ʽ���ʸ�ҳ�档��ȡ��param����Ϊ��" + param + "<br/>");

		// input
		out.println(" <form action='" + requestURI + "' method='get'>"
				+ "<input type='text' name='param' value='param string'>"
				+ "<input type='submit' value='��Get��ʽ��ѯҳ��  '" + requestURI
				+ "'>" + "</form>");
		out.println(" <form action='" + requestURI + "' method='post'>"
				+ "<input type='text' name='param' value='param string'>"
				+ "<input type='submit' value='��Post��ʽ��ѯҳ��  '" + requestURI
				+ "'>" + "</form>");
		// �ɿͻ����������ȡ���ĵ��ĸ���ʱ��
		out.println("	<script>document.write('��ҳ���������ʱ�䣺 '+document.lastModified);</script>");

		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
