const { CreateTable, ShowTable, UpdateTable, DeleteTable } = require('../Controller/tableController');
const checkAdmin = require('../middleware/checkAdmin');
const { verifyToken } = require('../middleware/verifyToken');
const prisma = require('../prisma/client');
const router = require('./adminRouter');

router.post('/create',verifyToken,checkAdmin,CreateTable);
router.get('/showAll',verifyToken,ShowTable);
router.get('/showTable/:TableID',verifyToken,ShowTable);
router.put('/updateTable/:TableID',verifyToken,checkAdmin,UpdateTable);
router.delete('/deleteTable/:TableID',verifyToken,checkAdmin,DeleteTable);

module.exports = router;