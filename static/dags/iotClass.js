const branches = {};

  // ROOT SYSTEM BUS
  branches.BUS = gitgraph.branch("BUS");
  branches.BUS.commit({
    subject: "SYS_INIT",
    tag: "System-wide initialization",
  });

  // IOT base subsystem
  branches.IOT = branches.BUS.branch("IOT");
  branches.IOT.commit({
    subject: "IOT_INIT",
    tag: "Initialize IOT Subsystem Core",
  });

  // POWER MANAGEMENT DOMAIN
  branches.PWR = branches.IOT.branch("PWR");
  branches.PWR.commit({ subject: "PWR_CFG", tag: "+3V3" });
  branches.PWR.commit({ subject: "PWR_SEQ", tag: "Power Sequencer" });
  branches.PWR.commit({ subject: "PWR_SIG", tag: "Signal Conditioning" });
  branches.PWR.commit({ subject: "PWR_MON", tag: "Monitoring" });

  branches.IOT.commit({ subject: "IOT_PWR_SYNC", tag: "Integrate Power Layer" });
  branches.IOT.merge(branches.PWR, { subject: "MERGE_PWR" });

  // CONTROL DOMAIN
  branches.CTRL = branches.IOT.branch("CTRL");
  branches.CTRL.commit({ subject: "CTRL_RD", tag: "Read Sequence" });
  branches.CTRL.commit({ subject: "CTRL_WR", tag: "Write Sequence" });
  branches.CTRL.commit({ subject: "CTRL_EN", tag: "REVERSE" });
  branches.CTRL.commit({ subject: "CTRL_INT", tag: "Interrupt Handling" });

  branches.IOT.commit({
    subject: "IOT_CTRL_SYNC",
    tag: "Integrate Control Layer",
  });
  branches.IOT.merge(branches.CTRL, { subject: "MERGE_CTRL" });

  // EXTENDED CONTROL DOMAIN
  branches.XCTRL = branches.IOT.branch("XCTRL");
  branches.XCTRL.commit({ subject: "MODE_INIT", tag: "Init Mode Registers" });
  branches.XCTRL.commit({ subject: "FUNC_SEL", tag: "Select Function" });
  branches.XCTRL.commit({ subject: "STATE_SYNC", tag: "Sync State" });
  branches.XCTRL.commit({ subject: "ERR_REC", tag: "Error Recovery" });

  branches.IOT.commit({
    subject: "IOT_XCTRL_SYNC",
    tag: "Integrate Extended Control Layer",
  });
  branches.IOT.merge(branches.XCTRL, { subject: "MERGE_XCTRL" });

  // DATA TRANSPORT DOMAIN
  branches.DATA = branches.IOT.branch("DATA");
  branches.DATA.commit({ subject: "TMDS" });
  branches.DATA.commit({ subject: "I2C_DDC" });
  branches.DATA.commit({ subject: "CEC" });
  branches.DATA.commit({ subject: "SERDES" });
  branches.DATA.commit({ subject: "BUS_HANDSHAKE" });

  branches.IOT.commit({
    subject: "IOT_DATA_SYNC",
    tag: "Integrate Data Layer",
  });
  branches.IOT.merge(branches.DATA, { subject: "MERGE_DATA" });

  // SENSORS
  branches.SENSORS = branches.IOT.branch("SENSORS");
  branches.SENSORS.commit({ subject: "SENS_INIT" });
  branches.SENSORS.commit({ subject: "SENS_READ" });
  branches.SENSORS.commit({ subject: "SENS_INT" });
  branches.SENSORS.commit({ subject: "SENS_CAL" });

  branches.IOT.commit({
    subject: "IOT_SENS_SYNC",
    tag: "Integrate Sensor Interfaces",
  });
  branches.IOT.merge(branches.SENSORS, { subject: "MERGE_SENS" });

  // COMM
  branches.COMM = branches.IOT.branch("COMM");
  branches.COMM.commit({ subject: "UART" });
  branches.COMM.commit({ subject: "SPI" });
  branches.COMM.commit({ subject: "I2C" });
  branches.COMM.commit({ subject: "BLE" });
  branches.COMM.commit({ subject: "WIFI" });

  branches.IOT.commit({
    subject: "IOT_COMM_SYNC",
    tag: "Integrate Communication Protocols",
  });
  branches.IOT.merge(branches.COMM, { subject: "MERGE_COMM" });

  // FINAL INTEGRATION
  branches.IOT.commit({
    subject: "IOT_COMMIT",
    tag: "IOT_FABRIC",
  });

  branches.BUS.merge(branches.IOT, {
    subject: "MERGE_IOT_TO_BUS",
    tag: "IOT subsystem integrated into System Bus",
  });
