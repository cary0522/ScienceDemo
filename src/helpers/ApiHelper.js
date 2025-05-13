import axios from "axios";
import Swal from "sweetalert2";

let ApiHelper = {
  ProcessErrMsg: function (err) {
    console.log(err);
    let Msg = err.message;
    if (err.response && err.response.data["Message"])
      Msg = err.response.data.Message;
    return Msg;
  },
  Axios: function (url, method, data, Then, Catch = null) {
    axios({
      method: method,
      url: import.meta.env.VITE_APP_URL + url,
      data: data,
    })
      .then(Then)
      .catch(
        Catch != null
          ? Catch
          : (err) => {
              Swal.fire({
                icon: "error",
                html: `${ApiHelper.ProcessErrMsg(err)}`,
                confirmButtonText: "確定",
              });
            }
      );
  },
  /* 此專案的使用者身份枚舉 */
  IdentityEnum: {
    總務處管理者: 1,
    教務處管理者: 2,
    教師: 3,
    學生: 4,
    訪客: 5,
  },
  OperateTypeEnum: {
    單筆新增: 1,
    單筆編輯: 2,
    批次啟用: 3,
    批次停用: 4,
    批次重設: 5,
    批次移除: 6,
  },
  //檔案下載專用
  FileDownload: function (
    url,
    method,
    data,
    FileName = null,
    Catch = null,
    ErrorPage = null,
    LoadingControl = null
  ) {
    axios({
      method: method,
      url: import.meta.env.VITE_APP_URL + url,
      data: data,
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data], { type: res.data.type });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;

        link.download = decodeURIComponent(
          res.headers["content-disposition"]
            ? res.headers["content-disposition"]
                .split(";")[1]
                .split("=utf-8''")[1]
            : FileName
        );
        // Add the link to the document, click it, then remove it
        document.body.appendChild(link);
        link.click();
        link.remove();
        if (LoadingControl != null && typeof LoadingControl === "function") {
          LoadingControl();
        }
      })
      .catch(
        Catch != null
          ? Catch
          : (err) => {
              //判斷是否要關閉讀取視窗
              if (
                LoadingControl != null &&
                typeof LoadingControl === "function"
              ) {
                LoadingControl();
              }

              //如果後端有回應拋出後端的訊息
              if (err.response.data.size > 0) {
                const reader = new FileReader();
                reader.onload = function () {
                  Swal.fire({
                    icon: "error",
                    html: `${JSON.parse(reader.result).Message}`,
                    confirmButtonText: "確定",
                  }).then(() => {
                    if (ErrorPage != null) {
                      location.href = ErrorPage;
                    }
                  });
                };
                reader.readAsText(err.response.data);
              }
              //拋出Axios獲取到的訊息
              else {
                Swal.fire({
                  icon: "error",
                  html: `${ApiHelper.ProcessErrMsg(err)}`,
                  confirmButtonText: "確定",
                }).then(() => {
                  if (ErrorPage != null) {
                    location.href = ErrorPage;
                  }
                });
              }
            }
      );
  },
  //檔案上傳專用
  FileUpload: function (
    url,
    method,
    data,
    Then,
    Catch = null,
    ErrorPage = null,
    LoadingControl = null
  ) {
    axios({
      method: method,
      url: import.meta.env.VITE_APP_URL + url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(Then)
      .catch(
        Catch != null
          ? Catch
          : (err) => {
              if (
                LoadingControl != null &&
                typeof LoadingControl === "function"
              ) {
                LoadingControl();
              }

              Swal.fire({
                icon: "error",
                html: `${ApiHelper.ProcessErrMsg(err)}`,
                confirmButtonText: "確定",
              }).then(() => {
                if (ErrorPage != null) {
                  location.href = ErrorPage;
                }
              });
            }
      );
  },
};

export default ApiHelper;
