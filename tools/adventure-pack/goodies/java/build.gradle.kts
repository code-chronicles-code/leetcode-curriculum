import org.gradle.api.tasks.testing.logging.TestExceptionFormat

plugins {
    java
}

sourceSets {
    main {
        java {
            srcDirs("src")
            exclude("**/Test.java")
        }
    }
    test {
        java {
            srcDirs("src")
            include("**/Test.java")
        }
    }
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.3"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("failed", "passed", "skipped", "standard_error", "standard_out")

        exceptionFormat = TestExceptionFormat.FULL
    }
}
