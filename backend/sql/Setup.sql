use advancemobility;

CREATE TABLE Vehicles (
    VehicleNumber INT PRIMARY KEY auto_increment,
    VehicleType VARCHAR(100),
    PUCCertificate VARCHAR(256),
    InsuranceCertificate VARCHAR(256)
);

-- INSERT into vehicles (VehicleNumber, VehicleType, PUCCertificate, InsuranceCertificate)
-- values (1, "Two Wheeler", "somelink", "sonmelink")

select * from vehicles