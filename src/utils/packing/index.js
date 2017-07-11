const Packing = (result, errorCode, internalMessage, friendlyMessage) => {
    return {
        code: errorCode || 0,
        internalMessage,
        message: friendlyMessage || 'success',
        responseFrom: {
            gid: process.getgid && process.getgid(),
            pid: process.pid,
            uid: process.getuid && process.getuid()
        },
        result,
        success: errorCode ? false : true
    };
};

module.exports = Packing;