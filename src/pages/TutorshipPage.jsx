import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/table/DataTable";
import { listAll, remove } from "../services/TutorshipService";
import { getTutorshipssWithAllToStudent } from "../utils/arrayHelper";

const TutorshipPage = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTutorship, setSelectedTutorship] = useState({
    registerDate: new Date(),
    attended: false,
    course: { _id: "0", code: "", name: "" },
    section: { _id: "0", code: "" },
    student: { _id: "0", code: "", fullName: "" },
    tutor: { _id: "0", code: "", fullName: "" },
    topic: { _id: "0", description: "" },
  });

  const listAllFromApi = async () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getTutorshipssWithAllToStudent(data.data));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeFromApi = ({ row }) => {
    remove(row._id).then(
      (data) => {
        setSnackbar({
          open: true,
          message: data.message ? data.message : "Error en el mensaje",
        });
        if (data && data.status === 1) {
          listAllFromApi();
        }
      },
      (error) => {
        setSnackbar({ open: true, message: "Error en el servidor" });
        console.log(error);
      }
    );
  };



 /*useEffect(() => {
    validateUser();
    setLocalTitle();
    setColumns(
      getColumns(
        "tutorship",
        openUpdateDialog,
        removeFromApi,
        null,
        openDetailDialog
      )
    );
    listAllFromApi();
    
    socket.on("update tutorship list", () => {
      listAllFromApi();
    });

  }, [socket]);*/
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default TutorshipPage;
